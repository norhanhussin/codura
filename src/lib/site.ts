// ============================================================
// إعدادات أكاديمية Codura — عدّل القيم هنا فقط
// ============================================================
// Edit the values below to update the whole site. Items marked
// TODO(Owner) must be replaced with the academy's real details
// before publishing.

export const site = {
  brandName: "Codura Academy",
  brandNameAr: "كودورا أكاديمي",

  // TODO(Owner): replace with the academy's real WhatsApp number in
  // international format WITHOUT "+" or spaces, e.g. "201001234567".
  // The current value is a placeholder.
  whatsappNumber: "201000000000",

  // Default message pre-filled when a parent opens WhatsApp.
  whatsappGreeting:
    "أهلاً Codura Academy، عايز/عايزة أحجز سيشن تجريبي مجاني لابني/ابنتي.",

  // TODO(Owner): replace with the official page URLs once available.
  // Leave as "" to show the link as "coming soon" on the site.
  facebookUrl: "",
  instagramUrl: "",
};

export function whatsappLink(message: string = site.whatsappGreeting) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
