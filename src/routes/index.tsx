import { Link, createFileRoute } from "@tanstack/react-router";
import {
  BellRing,
  Blocks,
  Bot,
  CalendarCheck,
  ChevronDown,
  Code2,
  Compass,
  Facebook,
  Instagram,
  MessageCircle,
  Rocket,
  Shapes,
  Terminal,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { site, whatsappLink, pricingPackages } from "@/lib/site";
import heroIllustration from "@/assets/hero-illustration-optimized.jpg";

const steps: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: CalendarCheck,
    title: "احجز السيشن التجريبية",
    text: "املأ نموذج الحجز أو كلمنا على واتساب، ونحن نتواصل معاك لتأكيد الوقت المناسب لسيشن فردية مجانية.",
  },
  {
    icon: Compass,
    title: "نحدد المسار المناسب",
    text: "في السيشن التجريبية نتعرف على مستوى الطالب واهتماماته، ونقترح عليه المسار الأنسب لسنه ومستواه.",
  },
  {
    icon: Rocket,
    title: "ابدأ التعلم بالمشاريع",
    text: "الطالب يتعلم خطوة بخطوة ويصنع مشاريع حقيقية بنفسه، مع تحديث مستمر لولي الأمر عن تقدمه.",
  },
];

const paths: {
  icon: LucideIcon;
  title: string;
  tagline: string;
  suits: string;
  learns: string[];
  iconClass: string;
}[] = [
  {
    icon: Shapes,
    title: "سكراتش (Scratch)",
    tagline: "برمجة إبداعية بالسحب والإفلات",
    suits: "المبتدئين والأطفال الصغار اللي بيبدأوا رحلتهم مع البرمجة.",
    learns: [
      "صناعة ألعاب ورسوم متحركة",
      "التفكير المنطقي وحل المشكلات",
      "أساسيات البرمجة بطريقة ممتعة",
    ],
    iconClass: "bg-primary/10 text-primary",
  },
  {
    icon: Terminal,
    title: "بايثون (Python)",
    tagline: "لغة برمجة حقيقية ومشاريع عملية",
    suits: "الطلاب اللي عايزين يتعمقوا في البرمجة الحقيقية وبناء مشاريع فعلية.",
    learns: [
      "أساسيات البرمجة والمتغيرات والدوال",
      "حل المسائل والتفكير الخوارزمي",
      "مشاريع عملية يصنعها الطالب بنفسه",
    ],
    iconClass: "bg-glow/10 text-glow",
  },
  {
    icon: Code2,
    title: "تطوير الويب",
    tagline: "إنشاء صفحات ومواقع ويب تفاعلية",
    suits: "الطلاب المهتمين ببناء مواقعهم والتعرف على طريقة عمل الويب.",
    learns: [
      "بناء صفحات الويب وتنسيقها",
      "إضافة التفاعل إلى صفحات المواقع",
      "تنفيذ مشروع ويب عملي",
    ],
    iconClass: "bg-aqua/15 text-aqua-strong",
  },
  {
    icon: Bot,
    title: "الذكاء الاصطناعي (AI)",
    tagline: "مفاهيم الذكاء الاصطناعي للناشئة",
    suits: "الطلاب الفضوليين اللي عايزين يفهموا ويجربوا تقنيات الذكاء الاصطناعي.",
    learns: [
      "مفاهيم الذكاء الاصطناعي بشكل مناسب للسن",
      "أنشطة وتجارب عملية تفاعلية",
      "استخدام أدوات الذكاء الاصطناعي في مشاريع",
    ],
    iconClass: "bg-aqua/15 text-aqua-strong",
  },
];

const benefits: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: UserRoundCheck,
    title: "اهتمام فردي كامل",
    text: "سيشنز فردية أونلاين — المدرب مركز على طالب واحد بسرعته ومستواه.",
  },
  {
    icon: Blocks,
    title: "تعلم مناسب لكل سن",
    text: "المحتوى والمسار بيتحددوا حسب سن الطالب من 6 إلى 18 سنة ومستواه.",
  },
  {
    icon: Rocket,
    title: "مشاريع حقيقية",
    text: "الطالب مش بيحفظ — بيصنع مشاريع فعلية بنفسه ويشوف نتيجة تعبه.",
  },
  {
    icon: BellRing,
    title: "تحديث مستمر لولي الأمر",
    text: "تتابع تقدم ابنك وتعرف وصل لإيه في كل مرحلة.",
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "السيشن التجريبية مجانية فعلاً؟",
    a: "نعم، السيشن التجريبية سيشن فردية أونلاين مجانية بالكامل. بنتعرف فيها على مستوى الطالب ونقترح المسار الأنسب، وبعدها بنتواصل معاك على واتساب لشرح الخطوات الجاية.",
  },
  {
    q: "إيه الأجهزة المطلوبة للحصة؟",
    a: "أي كمبيوتر أو لابتوب أو تابلت واتصال إنترنت كافي، لأن كل السيشنز بتكون أونلاين مباشرة مع المدرب.",
  },
  {
    q: "هل المحتوى مناسب لكل الأعمار من 6 لـ 18 سنة؟",
    a: "أيوة — كل طالب بيتعلم في المسار والمستوى المناسب لسنه: من البرمجة الإبداعية بالسكراتش للصغار، لحد بايثون والذكاء الاصطناعي للكبار.",
  },
  {
    q: "إزاي أعرف المستوى المناسب لابني؟",
    a: 'مش محتاج تحدد بنفسك — في السيشن التجريبية بنقيم مستوى الطالب واهتماماته ونرشحلك أحسن مسار، وممكن تختار "ساعدوني أختار" في نموذج الحجز.',
  },
  {
    q: "إزاي بتابع تقدم ابني؟",
    a: "بنبعت تحديثات دورية لولي الأمر عن تقدم الطالب والمشاريع اللي صنعها، عشان تفضل على علم بخطوته في كل مرحلة.",
  },
];

function value(content: string, placeholder = "سيتم الإعلان عنه") {
  return content.trim() ? content : placeholder;
}

const availablePricingPackages = pricingPackages.filter((pkg) =>
  [pkg.name, pkg.sessions, pkg.duration, pkg.price].some((item) => item.trim()),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Codura | خلي ابنك يتعلم البرمجة ويصنع مشروعاته بنفسه",
      },
      {
        name: "description",
        content:
          "تعليم البرمجة والذكاء الاصطناعي أونلاين للطلاب من 6 إلى 18 سنة، من خلال سيشنز فردية وتطبيق عملي يناسب مستوى كل طالب. احجز سيشن تجريبي مجاني.",
      },
      {
        property: "og:title",
        content: "Codura | خلي ابنك يتعلم البرمجة ويصنع مشروعاته بنفسه",
      },
      {
        property: "og:description",
        content:
          "تعليم البرمجة والذكاء الاصطناعي أونلاين للطلاب من 6 إلى 18 سنة — احجز سيشن تجريبي مجاني.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="bg-gradient-soft">
          <div className="section-shell grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
            <div className="text-center lg:text-start">
              <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold text-primary">
                أونلاين لطلاب العالم العربي من 6 لـ 18 سنة
              </span>
              <h1 className="mt-5 text-3xl font-black leading-[1.35] sm:text-4xl lg:text-[2.75rem]">
                خلي ابنك <span className="text-gradient-brand">يتعلم البرمجة</span> ويصنع مشروعاته
                بنفسه
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground lg:mx-0">
                تعليم البرمجة والذكاء الاصطناعي أونلاين للطلاب من 6 إلى 18 سنة، من خلال سيشنز فردية
                وتطبيق عملي يناسب مستوى كل طالب.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Button asChild variant="hero" size="xl">
                  <Link to="/booking">احجز سيشن تجريبي مجاني</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="xl"
                  className="border-primary/30 bg-background"
                >
                  <a href={whatsappLink()} target="_blank" rel="noreferrer">
                    <MessageCircle /> تواصل معانا على واتساب
                  </a>
                </Button>
              </div>
            </div>
            <div className="order-first lg:order-none">
              <img
                src={heroIllustration}
                alt="طلاب يتعلمون البرمجة والذكاء الاصطناعي أونلاين"
                width={1024}
                height={1024}
                className="mx-auto w-full max-w-lg rounded-3xl shadow-card lg:max-w-none"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 sm:py-20" aria-labelledby="how-heading">
          <div className="section-shell">
            <SectionHeading
              id="how-heading"
              eyebrow="إزاي بنشتغل"
              title="ثلاث خطوات بسيطة لبدء رحلة ابنك"
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="relative rounded-3xl border border-border bg-card p-6 shadow-card"
                >
                  <span className="absolute -top-4 start-6 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-brand text-sm font-extrabold text-primary-foreground shadow-brand">
                    {i + 1}
                  </span>
                  <step.icon className="h-9 w-9 text-primary" strokeWidth={1.8} />
                  <h3 className="mt-4 text-lg font-extrabold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning paths */}
        <section
          id="paths"
          className="scroll-mt-20 bg-gradient-soft py-16 sm:py-20"
          aria-labelledby="paths-heading"
        >
          <div className="section-shell">
            <SectionHeading
              id="paths-heading"
              eyebrow="مسارات التعلم"
              title="مسار مناسب لكل طالب حسب سنه ومستواه"
              subtitle="اختار المسار الأقرب لاهتمام ابنك — أو خليه يبدأ بسيشن تجريبية ونحن نرشحله الأنسب."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {paths.map((path) => (
                <div
                  key={path.title}
                  className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${path.iconClass}`}
                  >
                    <path.icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold">{path.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-muted-foreground">{path.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed">
                    <span className="font-bold">يناسب: </span>
                    <span className="text-muted-foreground">{path.suits}</span>
                  </p>
                  <p className="mt-3 text-sm font-bold">هتتعلم:</p>
                  <ul className="mt-1.5 space-y-1.5 text-sm text-muted-foreground">
                    {path.learns.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aqua-strong" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="hero" className="mt-6 w-full">
                    <Link to="/booking">احجز سيشن تجريبي</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 sm:py-20" aria-labelledby="benefits-heading">
          <div className="section-shell">
            <SectionHeading
              id="benefits-heading"
              eyebrow="ليه كودورا؟"
              title="اهتمام حقيقي بكل طالب"
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-3xl border border-border bg-card p-6 shadow-card"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                    <benefit.icon className="h-5.5 w-5.5 text-primary" strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 text-base font-extrabold">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="scroll-mt-20 bg-gradient-soft py-16 sm:py-20"
          aria-labelledby="pricing-heading"
        >
          <div className="section-shell">
            <SectionHeading
              id="pricing-heading"
              eyebrow="الاشتراكات"
              title="باقات الاشتراك"
              subtitle="للاستفسار عن الاشتراكات، تواصل معانا مباشرة."
            />
            {availablePricingPackages.length > 0 && (
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {availablePricingPackages.map((pkg, index) => (
                  <div
                    key={`${pkg.name}-${pkg.sessions}-${pkg.price}-${index}`}
                    className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-card"
                  >
                    <h3 className="text-lg font-extrabold">{value(pkg.name)}</h3>
                    <dl className="mt-4 space-y-3 text-sm">
                      <div className="flex items-center justify-between gap-2">
                        <dt className="text-muted-foreground">عدد السيشنز</dt>
                        <dd className="font-bold">{value(pkg.sessions)}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <dt className="text-muted-foreground">مدة السيشن</dt>
                        <dd className="font-bold">{value(pkg.duration)}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-2 border-t border-border pt-3">
                        <dt className="text-muted-foreground">السعر</dt>
                        <dd className="text-lg font-black text-primary">{value(pkg.price)}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            )}
            {availablePricingPackages.length === 0 && (
              <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-primary/20 bg-card px-6 py-8 text-center shadow-card sm:px-10">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp/10 text-whatsapp">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-extrabold">حابب تعرف تفاصيل الاشتراكات؟</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  كلمنا على واتساب، وهنجاوبك على استفساراتك ونشاركك التفاصيل المتاحة.
                </p>
                <Button
                  asChild
                  className="mt-5 bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
                >
                  <a
                    href={whatsappLink("أهلاً Codura، حابب أعرف تفاصيل الاشتراكات.")}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle /> اسألنا على واتساب
                  </a>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 py-16 sm:py-20" aria-labelledby="faq-heading">
          <div className="section-shell max-w-3xl">
            <SectionHeading
              id="faq-heading"
              eyebrow="الأسئلة الشائعة"
              title="أسئلة بتدور في دماغك؟"
            />
            <div className="mt-10 space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border border-border bg-card px-5 py-4 shadow-card open:border-primary/30"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-extrabold sm:text-base [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="pb-16 sm:pb-20" aria-labelledby="cta-heading">
          <div className="section-shell">
            <div className="rounded-4xl bg-gradient-brand px-6 py-12 text-center text-primary-foreground shadow-brand sm:px-12 sm:py-16">
              <h2 id="cta-heading" className="text-2xl font-black sm:text-3xl">
                جاهز يبدأ ابنك أول مشروع ليه؟
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed opacity-90 sm:text-base">
                احجز سيشن تجريبية فردية مجانية دلوقتي — هنرشحلك المسار الأنسب لابنك بعد أول لقاء.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  size="xl"
                  className="bg-background text-foreground hover:bg-background/90"
                >
                  <Link to="/booking">احجز سيشن تجريبي مجاني</Link>
                </Button>
                <Button
                  asChild
                  size="xl"
                  variant="outline"
                  className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <a href={whatsappLink()} target="_blank" rel="noreferrer">
                    <MessageCircle /> كلمنا على واتساب
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="scroll-mt-20 border-t border-border/60 bg-card py-16 sm:py-20"
          aria-labelledby="contact-heading"
        >
          <div className="section-shell text-center">
            <SectionHeading
              id="contact-heading"
              eyebrow="تواصل"
              title="عندك سؤال؟ كلمنا"
              subtitle="فريقنا جاهز يرد على استفساراتك ويشرحلك كل التفاصيل."
            />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
              >
                <a href={whatsappLink()} target="_blank" rel="noreferrer">
                  <MessageCircle /> واتساب
                </a>
              </Button>
              {site.facebookUrl ? (
                <Button asChild size="lg" variant="outline">
                  <a href={site.facebookUrl} target="_blank" rel="noreferrer">
                    <Facebook /> فيسبوك
                  </a>
                </Button>
              ) : (
                <Button size="lg" variant="outline" disabled>
                  <Facebook /> فيسبوك — قريباً
                </Button>
              )}
              {site.instagramUrl ? (
                <Button asChild size="lg" variant="outline">
                  <a href={site.instagramUrl} target="_blank" rel="noreferrer">
                    <Instagram /> انستجرام
                  </a>
                </Button>
              ) : (
                <Button size="lg" variant="outline" disabled>
                  <Instagram /> انستجرام — قريباً
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-extrabold uppercase tracking-wide text-primary">{eyebrow}</span>
      <h2 id={id} className="mt-2 text-2xl font-black sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
