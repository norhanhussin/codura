import { describe, expect, it } from "vitest";

import { bookingSchema } from "@/lib/booking-schema";

const validBooking = {
  parentName: "أم أحمد",
  parentWhatsapp: "+201001234567",
  studentAge: 9,
  experienceLevel: "beginner",
  learningPath: "scratch",
} as const;

describe("Trial booking validation", () => {
  it("accepts a valid booking", () => {
    const result = bookingSchema.safeParse(validBooking);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.parentWhatsapp).toBe("+201001234567");
  });

  it("accepts web development as a learning path", () => {
    expect(bookingSchema.safeParse({ ...validBooking, learningPath: "web" }).success).toBe(true);
  });

  it("accepts data analysis as a learning path", () => {
    expect(
      bookingSchema.safeParse({ ...validBooking, learningPath: "data_analysis" }).success,
    ).toBe(true);
  });

  it.each(["+966501234567", "+971501234567", "+212612345678"])(
    "accepts a valid international phone number: %s",
    (parentWhatsapp) => {
      expect(bookingSchema.safeParse({ ...validBooking, parentWhatsapp }).success).toBe(true);
    },
  );

  it("normalizes international phone formatting", () => {
    const result = bookingSchema.safeParse({
      ...validBooking,
      parentWhatsapp: "+966 50-123-4567",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.parentWhatsapp).toBe("+966501234567");
  });

  it("rejects student ages outside 6–18", () => {
    expect(bookingSchema.safeParse({ ...validBooking, studentAge: 5 }).success).toBe(false);
    expect(bookingSchema.safeParse({ ...validBooking, studentAge: 19 }).success).toBe(false);
  });

  it("rejects a WhatsApp number that is not a phone number", () => {
    expect(bookingSchema.safeParse({ ...validBooking, parentWhatsapp: "abc" }).success).toBe(false);
    expect(bookingSchema.safeParse({ ...validBooking, parentWhatsapp: "12" }).success).toBe(false);
    expect(
      bookingSchema.safeParse({ ...validBooking, parentWhatsapp: "201001234567" }).success,
    ).toBe(false);
  });

  it("requires a parent name", () => {
    expect(bookingSchema.safeParse({ ...validBooking, parentName: "  " }).success).toBe(false);
  });
});
