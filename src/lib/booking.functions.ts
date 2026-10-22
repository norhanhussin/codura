import { createServerFn } from "@tanstack/react-start";
import { bookingSchema } from "./booking-schema";

/**
 * Public (unauthenticated) server function that receives a trial-booking
 * submission from the booking form. Input is validated with zod before the
 * row is inserted with the service-role client. The trial_bookings table
 * has RLS enabled with no policies, so the Data API cannot read or write
 * it — this validated function is the only write path.
 */
export const submitTrialBooking = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin.from("trial_bookings").insert({
        parent_name: data.parentName,
        parent_whatsapp: data.parentWhatsapp,
        student_age: data.studentAge,
        experience_level: data.experienceLevel,
        learning_path: data.learningPath,
        preferred_day: data.preferredDay || null,
        preferred_time: data.preferredTime || null,
        parent_notes: data.parentNotes || null,
      });
      if (error) {
        console.error("Trial booking insert failed:", error.message);
        return { ok: false as const, error: "storage" as const };
      }
      return { ok: true as const };
    } catch (e) {
      console.error("Trial booking handler failed:", e);
      return { ok: false as const, error: "storage" as const };
    }
  });
