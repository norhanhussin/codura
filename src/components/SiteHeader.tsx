import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { site } from "@/lib/site";
import logoMark from "@/assets/logo-mark.jpg";

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
          <span className="block h-10 w-10 shrink-0 overflow-hidden rounded-xl shadow-card">
            <img src={logoMark} alt="" className="block h-full w-full object-cover" />
          </span>
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

        <div className="flex items-center gap-2">
          <Button asChild variant="hero" size="sm" className="rounded-xl">
            <Link to="/booking">
              <span className="sm:hidden">احجز</span>
              <span className="hidden sm:inline">احجز سيشن تجريبي</span>
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="فتح القائمة">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,85vw)]">
              <SheetTitle className="sr-only">قائمة التنقل</SheetTitle>
              <SheetDescription className="sr-only">روابط أقسام موقع كودورا</SheetDescription>
              <nav className="mt-8 flex flex-col gap-2" aria-label="التنقل على الهاتف">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      className="rounded-lg px-3 py-3 text-sm font-semibold transition-colors hover:bg-muted"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    to="/booking"
                    className="rounded-lg px-3 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
                  >
                    احجز سيشن تجريبي
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
