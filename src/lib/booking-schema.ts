import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js/min";

export const EXPERIENCE_LEVELS = ["beginner", "some_experience", "experienced"] as const;
export const LEARNING_PATHS = ["scratch", "python", "ai", "web", "help_me_choose"] as const;

export const experienceLabels: Record<(typeof EXPERIENCE_LEVELS)[number], string> = {
  beginner: "مبتدئ — لم يبرمج قبل كده",
  some_experience: "خبرة بسيطة — جرّب شوية",
  experienced: "عنده خبرة كويسة",
};

export const learningPathLabels: Record<(typeof LEARNING_PATHS)[number], string> = {
  scratch: "سكراتش (Scratch)",
  python: "بايثون (Python)",
  ai: "الذكاء الاصطناعي (AI)",
  web: "تطوير الويب",
  help_me_choose: "ساعدوني أختار المناسب",
};

export const bookingSchema = z.object({
  parentName: z.string().trim().min(2, "من فضلك اكتب اسم ولي الأمر").max(120, "الاسم طويل جداً"),
  parentWhatsapp: z
    .string()
    .trim()
    .refine(
      (value) => value.startsWith("+") && Boolean(parsePhoneNumberFromString(value)?.isValid()),
      "اكتب رقم واتساب صحيحًا مع + ومفتاح الدولة، مثال: +20 أو +966",
    )
    .transform((value) => parsePhoneNumberFromString(value)!.number),
  studentAge: z.coerce
    .number({ invalid_type_error: "من فضلك اختر سن الطالب" })
    .int()
    .min(6, "السيشن متاحة للطلاب من 6 لـ 18 سنة")
    .max(18, "السيشن متاحة للطلاب من 6 لـ 18 سنة"),
  experienceLevel: z.enum(EXPERIENCE_LEVELS, {
    errorMap: () => ({ message: "من فضلك اختر مستوى الخبرة" }),
  }),
  learningPath: z.enum(LEARNING_PATHS, {
    errorMap: () => ({ message: "من فضلك اختر المسار" }),
  }),
  preferredDay: z.string().trim().max(60).optional(),
  preferredTime: z.string().trim().max(60).optional(),
  parentNotes: z.string().trim().max(1000, "الملاحظات طويلة جداً").optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
