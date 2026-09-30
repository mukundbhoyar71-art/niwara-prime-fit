// Single source of truth for Niwara business details. Update here only with confirmed information.
export const business = {
  name: "Niwara Gym by V3 Fitness",
  addressLines: ["Niwara Campus", "96, Navi Peth, Thosarpaga", "Pune, Maharashtra 411030"],
  address: "Niwara Campus, 96, Navi Peth, Thosarpaga, Pune, Maharashtra 411030",
  phoneDisplay: "098603 30423",
  phoneHref: "tel:09860330423",
  whatsappNumber: "919860330423",
  whatsappMessage: "Hi, I'm interested in joining Niwara Gym by V3 Fitness. Could you please share the membership plans and timings?",
  // Set to the gym's real Google review profile URL when available.
  googleReviewsUrl: null as string | null,
};

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address)}`;
export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.name + ", " + business.address)}`;
export const whatsappUrl = (message = business.whatsappMessage) => `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
export const reviewsUrl = business.googleReviewsUrl ?? mapsSearchUrl;

// Opening hours: only the opening time is confirmed. Add closing times / weekly schedule when provided.
export const openingHours = {
  opens: "6:00 AM",
  closes: null as string | null,
  note: "Opening hours may vary. Contact the gym for today's closing time.",
};

// Genuine reviews only — add real reviews from the gym's review platform here.
export const testimonials: { text: string; firstName: string; rating: number; photo?: string }[] = [];
