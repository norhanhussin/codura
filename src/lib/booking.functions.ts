import { createServerFn } from "@tanstack/react-start";
import { bookingSchema } from "./booking-schema";

/**
 * Public (unauthenticated) server function that receives a trial-booking
 * submission from the booking form. Input is validated with zod before the
 * request calls a narrowly scoped database function using the publishable key.
 * The database function is the only public write path; the table itself has
 * RLS enabled and no public table policies.
 */
export const submitTrialBooking = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const supabaseUrl = process.env["SUPABASE_URL"] || import.meta.env["VITE_SUPABASE_URL"];
    const publishableKey =
      process.env["SUPABASE_PUBLISHABLE_KEY"] || import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];

    if (!supabaseUrl || !publishableKey) {
      console.error("Trial booking configuration missing", {
        supabaseUrl: !supabaseUrl,
        publishableKey: !publishableKey,
      });
      return { ok: false as const, error: "storage" as const };
    }

    try {
      const response = await fetch(
        `${supabaseUrl.replace(/\/+$/, "")}/rest/v1/rpc/submit_trial_booking`,
        {
          method: "POST",
          headers: {
            apikey: publishableKey,
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            p_parent_name: data.parentName,
            p_parent_whatsapp: data.parentWhatsapp,
            p_student_age: data.studentAge,
            p_experience_level: data.experienceLevel,
            p_learning_path: data.learningPath,
            p_preferred_day: data.preferredDay || null,
            p_preferred_time: data.preferredTime || null,
            p_parent_notes: data.parentNotes || null,
          }),
        },
      );

      if (!response.ok) {
        let errorCode = "unknown";
        try {
          const body: unknown = await response.json();
          if (body && typeof body === "object" && "code" in body && typeof body.code === "string") {
            errorCode = body.code;
          }
        } catch {
          // Keep the public response generic when the API does not return JSON.
        }
        console.error("Trial booking database request failed", {
          status: response.status,
          code: errorCode,
        });
        return { ok: false as const, error: "storage" as const };
      }

      return { ok: true as const };
    } catch (error) {
      console.error("Trial booking network request failed", {
        errorName: error instanceof Error ? error.name : "UnknownError",
      });
      return { ok: false as const, error: "storage" as const };
    }
  });
