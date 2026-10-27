import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site, whatsappLink } from "@/lib/site";
import logoMark from "@/assets/logo-mark.jpg";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="section-shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="block h-9 w-9 shrink-0 overflow-hidden rounded-lg">
              <img src={logoMark} alt="" className="block h-full w-full object-cover" />
            </span>
            <span className="text-base font-extrabold">{site.brandName}</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            تعليم البرمجة والذكاء الاصطناعي أونلاين للطلاب من 6 إلى 18 سنة، بسيشنز فردية ومشاريع
            عملية تناسب مستوى كل طالب.
          </p>
        </div>

        <nav className="space-y-3" aria-label="روابط سريعة">
          <h3 className="text-sm font-bold">روابط سريعة</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="transition-colors hover:text-primary">
                الرئيسية
              </Link>
            </li>
            <li>
              <a href="/#paths" className="transition-colors hover:text-primary">
                مسارات التعلم
              </a>
            </li>
            <li>
              <a href="/#pricing" className="transition-colors hover:text-primary">
                الاشتراكات
              </a>
            </li>
            <li>
              <Link to="/booking" className="transition-colors hover:text-primary">
                احجز سيشن تجريبي
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="transition-colors hover:text-primary">
                سياسة الخصوصية
              </Link>
            </li>
          </ul>
        </nav>

        <div className="space-y-3">
          <h3 className="text-sm font-bold">تواصل معانا</h3>
          <div className="flex flex-wrap gap-2">
            <Button asChild className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
              <a href={whatsappLink()} target="_blank" rel="noreferrer">
                <MessageCircle /> واتساب
              </a>
            </Button>
            {site.facebookUrl ? (
              <Button asChild variant="outline">
                <a href={site.facebookUrl} target="_blank" rel="noreferrer">
                  <Facebook /> فيسبوك
                </a>
              </Button>
            ) : (
              <Button variant="outline" disabled>
                <Facebook /> فيسبوك — قريباً
              </Button>
            )}
            {site.instagramUrl ? (
              <Button asChild variant="outline">
                <a href={site.instagramUrl} target="_blank" rel="noreferrer">
                  <Instagram /> انستجرام
                </a>
              </Button>
            ) : (
              <Button variant="outline" disabled>
                <Instagram /> انستجرام — قريباً
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 py-4">
        <p className="section-shell text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.brandName} — جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}
