import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, ShieldCheck, Sparkles, Video } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      {
        title: "احجز سيشن تجريبي مجاني | Codura Academy",
      },
      {
        name: "description",
        content:
          "احجز سيشن تجريبية فردية مجانية أونلاين لابنك من Codura Academy — البرمجة والذكاء الاصطناعي للطلاب من 6 إلى 18 سنة. الفريق بيتواصل معاك على واتساب لتأكيد الوقت.",
      },
      {
        property: "og:title",
        content: "احجز سيشن تجريبي مجاني | Codura Academy",
      },
      {
        property: "og:description",
        content:
          "سيشن تجريبية فردية مجانية أونلاين — نحدد المستوى المناسب لابنك ونرشحله أحسن مسار.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BookingPage,
});

const assurances = [
  {
    icon: Sparkles,
    title: "سيشن فردية مجانية",
    text: "لقاء أونلاين فردي مخصص لابنك بالكامل، بدون أي التزام.",
  },
  {
    icon: Video,
    title: "نحدد المستوى والمسار",
    text: "نقيم مستوى الطالب واهتماماته ونرشحلك المسار الأنسب لسنه.",
  },
  {
    icon: ShieldCheck,
    title: "بياناتك محفوظة",
    text: "بياناتك بتُستخدم فقط للتواصل معاك لتأكيد الموعد، ومش بتنشر في أي مكان.",
  },
];

function BookingPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="bg-gradient-soft">
        <div className="section-shell py-12 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold text-primary">
              مجانية 100% — بدون أي التزام
            </span>
            <h1 className="mt-4 text-3xl font-black sm:text-4xl">
              احجز <span className="text-gradient-brand">السيشن التجريبية المجانية</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              املأ البيانات دي، وهنكلمك على واتساب لتحديد الوقت المتاح المناسب — السيشن فردية
              أونلاين بنحدد فيها مستوى الطالب ونرشحله أحسن مسار.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[1fr_320px]">
            <BookingForm />

            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              {assurances.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-card"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold">{item.title}</h2>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}

              <div className="rounded-2xl bg-gradient-brand p-5 text-primary-foreground shadow-brand">
                <p className="text-sm font-extrabold">تحب تتكلم معانا الأول؟</p>
                <p className="mt-1 text-xs leading-relaxed opacity-90">
                  كلمنا على واتساب وأي عضو من الفريق هيرد عليك ويجاوب على استفساراتك.
                </p>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-background px-4 py-2.5 text-sm font-bold text-foreground transition-opacity hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4" /> تواصل على واتساب
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
