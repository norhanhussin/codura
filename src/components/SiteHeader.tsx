import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import logoMark from "@/assets/logo-mark.png";

const navItems = [
  { href: "/#paths", label: "مسارات التعلم" },
  { href: "/#pricing", label: "الاشتراكات" },
  { href: "/#faq", label: "الأسئلة الشائعة" },
  { href: "/#contact", label: "تواصل معانا" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5" aria-label={site.brandName}>
          <img
            src={logoMark}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-xl shadow-card"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-extrabold text-foreground">{site.brandName}</span>
            <span className="text-[11px] font-semibold text-muted-foreground">
              برمجة وذكاء اصطناعي للطلاب
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="التنقل الرئيسي">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button asChild variant="hero" size="sm" className="rounded-xl">
          <Link to="/booking">احجز سيشن تجريبي</Link>
        </Button>
      </div>
    </header>
  );
}
