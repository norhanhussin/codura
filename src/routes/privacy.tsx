import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "سياسة الخصوصية | Codura" },
      {
        name: "description",
        content:
          "تعرف على البيانات التي نجمعها عند طلب حجز سيشن تجريبية وكيف نستخدمها ونحافظ على خصوصيتها.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="bg-gradient-soft py-12 sm:py-16">
        <article className="section-shell max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-card sm:p-10">
          <span className="text-xs font-extrabold text-primary">الخصوصية</span>
          <h1 className="mt-2 text-3xl font-black">خصوصية بيانات الحجز</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            بنحترم خصوصية بياناتك. الصفحة دي بتوضح البيانات اللي بنطلبها عند حجز السيشن التجريبية،
            واستخدامها وطريقة حفظها.
          </p>

          <section className="mt-8" aria-labelledby="collected-data">
            <h2 id="collected-data" className="text-lg font-extrabold">
              البيانات التي نجمعها
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              عند إرسال طلب الحجز، نطلب اسم ولي الأمر ورقم واتساب، وسن الطالب، ومستوى خبرته، والمسار
              الذي يفضله. ويمكن إضافة اليوم والوقت المفضلين وملاحظات اختيارية.
            </p>
          </section>

          <section className="mt-7" aria-labelledby="data-use">
            <h2 id="data-use" className="text-lg font-extrabold">
              كيف نستخدم البيانات؟
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              نستخدم البيانات للتواصل مع ولي الأمر على واتساب بخصوص طلب الحجز وتأكيد موعد السيشن
              التجريبية، ومراجعة المسار المناسب للطالب.
            </p>
          </section>

          <section className="mt-7" aria-labelledby="data-storage">
            <h2 id="data-storage" className="text-lg font-extrabold">
              حفظ البيانات والوصول إليها
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              تُحفظ طلبات الحجز في قاعدة بيانات خاصة، ولا يتيح جدول الحجوزات القراءة أو الكتابة
              العامة. ويُرسل الطلب عبر خدمة خادمية تتحقق من البيانات قبل حفظها. لا ننشر بيانات الحجز
              أو نشاركها مع أي طرف آخر.
            </p>
          </section>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-6">
            <Button asChild className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
              <a href={whatsappLink()} target="_blank" rel="noreferrer">
                <MessageCircle /> تواصل معنا بخصوص بياناتك
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/booking">العودة لنموذج الحجز</Link>
            </Button>
          </div>
        </article>
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
