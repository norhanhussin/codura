// ============================================================
// إعدادات Codura — عدّل القيم هنا فقط
// ============================================================
// Edit the values below to update the whole site. Items marked
// TODO(Owner) must be replaced with the academy's real details
// before publishing.

export const site = {
  brandName: "Codura",
  brandNameAr: "كودورا",

  // Real WhatsApp number (Egypt) in international format without "+" or spaces.
  whatsappNumber: "201029117192",

  // Default message pre-filled when a parent opens WhatsApp.
  whatsappGreeting:
    "أهلاً Codura، عايز/عايزة أحجز سيشن تجريبي مجاني لابني/ابنتي.",

  // Official social pages (username: CoduraCoding).
  facebookUrl: "https://www.facebook.com/CoduraCoding",
  instagramUrl: "https://www.instagram.com/CoduraCoding",
};

export function whatsappLink(message: string = site.whatsappGreeting) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// TODO(Owner): fill in the subscription packages once confirmed. Leave any
// value as "" and the site shows "سيتم الإعلان عنه" for it automatically.
export const pricingPackages = [
  { name: "", sessions: "", duration: "", price: "", featured: false },
  { name: "", sessions: "", duration: "", price: "", featured: false },
  { name: "", sessions: "", duration: "", price: "", featured: false },
];
