import { describe, expect, it } from "vitest";

import { bookingSchema } from "@/lib/booking-schema";

const validBooking = {
  parentName: "أم أحمد",
  parentWhatsapp: "201001234567",
  studentAge: 9,
  experienceLevel: "beginner",
  learningPath: "scratch",
} as const;

describe("Trial booking validation", () => {
  it("accepts a valid booking", () => {
    expect(bookingSchema.safeParse(validBooking).success).toBe(true);
  });

  it("rejects student ages outside 6–18", () => {
    expect(bookingSchema.safeParse({ ...validBooking, studentAge: 5 }).success).toBe(false);
    expect(bookingSchema.safeParse({ ...validBooking, studentAge: 19 }).success).toBe(false);
  });

  it("rejects a WhatsApp number that is not a phone number", () => {
    expect(bookingSchema.safeParse({ ...validBooking, parentWhatsapp: "abc" }).success).toBe(false);
    expect(bookingSchema.safeParse({ ...validBooking, parentWhatsapp: "12" }).success).toBe(false);
  });

  it("requires a parent name", () => {
    expect(bookingSchema.safeParse({ ...validBooking, parentName: "  " }).success).toBe(false);
  });
});
