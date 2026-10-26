import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitTrialBooking } from "@/lib/booking.functions";
import {
  bookingSchema,
  EXPERIENCE_LEVELS,
  LEARNING_PATHS,
  experienceLabels,
  learningPathLabels,
} from "@/lib/booking-schema";
import { whatsappLink } from "@/lib/site";

const AGES = Array.from({ length: 13 }, (_, i) => i + 6);
const DAYS = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "أي يوم مناسب"];
const TIMES = ["صباحاً", "بعد الظهر", "مساءً", "أي وقت مناسب"];

type FormState = {
  parentName: string;
  parentWhatsapp: string;
  studentAge: string;
  experienceLevel: string;
  learningPath: string;
  preferredDay: string;
  preferredTime: string;
  parentNotes: string;
};

const EMPTY_FORM: FormState = {
  parentName: "",
  parentWhatsapp: "",
  studentAge: "",
  experienceLevel: "",
  learningPath: "",
  preferredDay: "",
  preferredTime: "",
  parentNotes: "",
};

export function BookingForm() {
  const submitBooking = useServerFn(submitTrialBooking);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const set = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    const errors: Partial<Record<keyof FormState, string>> = {};
    if (!form.studentAge) errors["studentAge"] = "من فضلك اختر سن الطالب";
    if (!form.experienceLevel) errors["experienceLevel"] = "من فضلك اختر مستوى الخبرة";
    if (!form.learningPath) errors["learningPath"] = "من فضلك اختر المسار";

    const candidate = { ...form, studentAge: Number(form.studentAge) };
    const parsed = bookingSchema.safeParse(candidate);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "") as keyof FormState;
        if (key && !errors[key]) errors[key] = issue.message;
      }
    }
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setStatus("submitting");
    try {
      const result = await submitBooking({ data: parsed.data });
      if (result.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-card">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp/10">
          <CheckCircle2 className="h-9 w-9 text-whatsapp" />
        </div>
        <h2 className="mt-5 text-2xl font-extrabold">تم استلام طلبك بنجاح 🎉</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          شكراً لثقتك في {`Codura`}! فريقنا هيتواصل معاك على واتساب على الرقم اللي سجلته
          لتأكيد الوقت المتاح المناسب للسيشن التجريبية المجانية.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
            <a href={whatsappLink()} target="_blank" rel="noreferrer">
              <MessageCircle /> كلمنا على واتساب دلوقتي
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">العودة للرئيسية</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
    >
      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-bold">حصلت مشكلة في إرسال الطلب.</p>
            <p>
              جرّب تاني، أو كلمنا مباشرة على{" "}
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="font-bold underline"
              >
                واتساب
              </a>
              .
            </p>
          </div>
        </div>
      )}

      {/* اسم ولي الأمر */}
      <div className="space-y-2">
        <Label htmlFor="parentName">اسم ولي الأمر / الوصي *</Label>
        <Input
          id="parentName"
          name="parentName"
          autoComplete="name"
          className="h-11"
          placeholder="مثال: محمد أحمد"
          value={form.parentName}
          onChange={(e) => set("parentName", e.target.value)}
          aria-invalid={!!fieldErrors.parentName}
        />
        {fieldErrors.parentName && (
          <p className="text-xs font-semibold text-destructive">{fieldErrors.parentName}</p>
        )}
      </div>

      {/* رقم واتساب ولي الأمر */}
      <div className="space-y-2">
        <Label htmlFor="parentWhatsapp">رقم واتساب ولي الأمر *</Label>
        <Input
          id="parentWhatsapp"
          name="parentWhatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          className="h-11 text-right"
          placeholder="201001234567"
          value={form.parentWhatsapp}
          onChange={(e) => set("parentWhatsapp", e.target.value)}
          aria-invalid={!!fieldErrors.parentWhatsapp}
        />
        {fieldErrors.parentWhatsapp ? (
          <p className="text-xs font-semibold text-destructive">{fieldErrors.parentWhatsapp}</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            بالكود الدولي بدون + أو مسافات، مثال: 201001234567
          </p>
        )}
      </div>

      {/* سن الطالب */}
      <div className="space-y-2">
        <Label htmlFor="studentAge">سن الطالب *</Label>
        <Select value={form.studentAge} onValueChange={(v) => set("studentAge", v)}>
          <SelectTrigger id="studentAge" className="h-11 w-full">
            <SelectValue placeholder="اختر السن (من 6 لـ 18 سنة)" />
          </SelectTrigger>
          <SelectContent>
            {AGES.map((age) => (
              <SelectItem key={age} value={String(age)}>
                {age} سنة
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fieldErrors.studentAge && (
          <p className="text-xs font-semibold text-destructive">{fieldErrors.studentAge}</p>
        )}
      </div>

      {/* الخبرة السابقة */}
      <div className="space-y-2">
        <Label>الخبرة السابقة في البرمجة *</Label>
        <RadioGroup
          value={form.experienceLevel}
          onValueChange={(v) => set("experienceLevel", v)}
          className="grid gap-3 sm:grid-cols-3"
        >
          {EXPERIENCE_LEVELS.map((level) => (
            <Label
              key={level}
              htmlFor={`exp-${level}`}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-input bg-background p-3 font-normal transition-colors has-checked:border-primary has-checked:bg-primary/5"
            >
              <RadioGroupItem value={level} id={`exp-${level}`} className="mt-0.5" />
              <span className="text-sm leading-snug">{experienceLabels[level]}</span>
            </Label>
          ))}
        </RadioGroup>
        {fieldErrors.experienceLevel && (
          <p className="text-xs font-semibold text-destructive">{fieldErrors.experienceLevel}</p>
        )}
      </div>

      {/* المسار المفضل */}
      <div className="space-y-2">
        <Label htmlFor="learningPath">المسار المفضل *</Label>
        <Select value={form.learningPath} onValueChange={(v) => set("learningPath", v)}>
          <SelectTrigger id="learningPath" className="h-11 w-full">
            <SelectValue placeholder="اختر المسار" />
          </SelectTrigger>
          <SelectContent>
            {LEARNING_PATHS.map((path) => (
              <SelectItem key={path} value={path}>
                {learningPathLabels[path]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fieldErrors.learningPath && (
          <p className="text-xs font-semibold text-destructive">{fieldErrors.learningPath}</p>
        )}
      </div>

      {/* اليوم والوقت المفضلان */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="preferredDay">اليوم المفضل (اختياري)</Label>
          <Select value={form.preferredDay} onValueChange={(v) => set("preferredDay", v)}>
            <SelectTrigger id="preferredDay" className="h-11 w-full">
              <SelectValue placeholder="اختر اليوم" />
            </SelectTrigger>
            <SelectContent>
              {DAYS.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferredTime">الوقت المفضل (اختياري)</Label>
          <Select value={form.preferredTime} onValueChange={(v) => set("preferredTime", v)}>
            <SelectTrigger id="preferredTime" className="h-11 w-full">
              <SelectValue placeholder="اختر الوقت" />
            </SelectTrigger>
            <SelectContent>
              {TIMES.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            بنسجل تفضيلاتك ونؤكد الوقت المتاح معاك على واتساب.
          </p>
        </div>
      </div>

      {/* ملاحظات ولي الأمر */}
      <div className="space-y-2">
        <Label htmlFor="parentNotes">ملاحظات إضافية (اختياري)</Label>
        <Textarea
          id="parentNotes"
          name="parentNotes"
          className="min-h-24"
          placeholder="أي حاجة تحب تخبرنا فيها عن ابنك: اهتماماته، أو أي سؤال..."
          value={form.parentNotes}
          onChange={(e) => set("parentNotes", e.target.value)}
          aria-invalid={!!fieldErrors.parentNotes}
        />
        {fieldErrors.parentNotes && (
          <p className="text-xs font-semibold text-destructive">{fieldErrors.parentNotes}</p>
        )}
      </div>

      <Button type="submit" variant="hero" size="xl" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="animate-spin" /> جاري الإرسال...
          </>
        ) : (
          "احجز السيشن التجريبية المجانية"
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        بياناتك بتُستخدم فقط للتواصل معاك لتأكيد السيشن — ولن يتم نشرها أو مشاركتها مع أي طرف آخر.
      </p>
    </form>
  );
}
