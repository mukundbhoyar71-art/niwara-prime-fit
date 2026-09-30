import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3, MapPin, MessageCircle, Phone, Plus, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business, directionsUrl, openingHours, reviewsUrl, testimonials, whatsappUrl } from "@/lib/site-config";
import { LeadForm, focusForm } from "./LeadForm";
import { WhatsAppButton } from "./WhatsAppButton";
import heroImage from "@/assets/niwara-hero.jpg";
import equipmentImage from "@/assets/niwara-equipment.jpg";
import trainingImage from "@/assets/niwara-training.jpg";
import coachingImage from "@/assets/niwara-coaching.jpg";
import trainerOneImage from "@/assets/niwara-trainer-one.jpg";
import trainerTwoImage from "@/assets/niwara-trainer-two.jpg";

export const talkToTrainer = () => focusForm("contact-form");

export function QuickBar() {
  const items = ["MODERN EQUIPMENT", "SPACIOUS TRAINING AREA", "EXPERT TRAINER GUIDANCE", "PERSONALIZED ATTENTION", "NAVI PETH, PUNE"];
  return <section className="quick-bar" aria-label="Quick information"><ul className="page-gutter">{items.map(i => <li key={i}><span aria-hidden="true">✳</span>{i}</li>)}</ul></section>;
}

const equipment = [
  { title: "STRENGTH", items: ["Cable machines", "Strength equipment", "Free weights", "Machine-based training"] },
  { title: "CARDIO", items: ["Cardio equipment", "Conditioning area"] },
  { title: "TRAINING SPACE", items: ["Spacious workout floor", "Functional training space", "Stretching / movement area"] },
  { title: "OTHER FACILITIES", items: ["Restroom", "Shower", "Parking", "Accessible facilities"] },
];
export function Equipment() {
  return <section id="equipment" className="equipment section-pad page-gutter">
    <div className="section-kicker"><span>02B / EQUIPMENT</span><span>WHAT YOU'LL TRAIN WITH</span></div>
    <div className="section-heading-row"><h2>EQUIPPED<br /><em>FOR YOUR GOALS.</em></h2><p>Confirmed equipment and facilities at Niwara. Ask the team for anything specific you need.</p></div>
    <div className="equipment-layout">
      <div className="equipment-image"><img src={equipmentImage} alt="Training equipment on the gym floor" loading="lazy" width={1200} height={900} /></div>
      <div className="equipment-list">{equipment.map((g, i) => <div key={g.title}><div className="equipment-head"><span>0{i + 1}</span><h3>{g.title}</h3></div><ul>{g.items.map(it => <li key={it}>{it}</li>)}</ul></div>)}
        <a href="#facilities" className="text-link">VIEW FACILITIES <ArrowUpRight size={17} /></a>
      </div>
    </div>
  </section>;
}

const programs = [
  ["MUSCLE BUILDING", "Build strength and muscle with structured training."],
  ["WEIGHT LOSS", "Build consistent movement and training habits."],
  ["STRENGTH TRAINING", "Improve strength through progressive training."],
  ["GENERAL FITNESS", "Build fitness, movement and consistency."],
  ["BEGINNER TRAINING", "Get comfortable with training and learn the fundamentals."],
  ["PERSONAL TRAINING", "Personalized guidance based on individual goals."],
];
export function Programs() {
  return <section id="programs" className="programs section-pad page-gutter">
    <div className="section-kicker"><span>03B / PROGRAMS</span><span>FIND YOUR FOCUS</span></div>
    <div className="section-heading-row"><h2>TRAINING FOR<br /><em>YOUR GOALS.</em></h2><p>Every goal starts with showing up. Talk to the team about the right approach for you.</p></div>
    <div className="program-grid">{programs.map(([t, c], i) => <article key={t} className="program-card"><span>0{i + 1}</span><h3>{t}</h3><p>{c}</p></article>)}</div>
    <div className="section-cta"><Button variant="dark" size="editorial" onClick={talkToTrainer}>TALK TO A TRAINER <ArrowUpRight /></Button></div>
  </section>;
}

const plans = [["MONTHLY", "1 MONTH"], ["QUARTERLY", "3 MONTHS"], ["HALF-YEARLY", "6 MONTHS"], ["YEARLY", "12 MONTHS"]] as const;
const planDuration: Record<string, string> = { MONTHLY: "Monthly (1 month)", QUARTERLY: "Quarterly (3 months)", "HALF-YEARLY": "Half-yearly (6 months)", YEARLY: "Yearly (12 months)" };
export function Plans() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [plan, setPlan] = useState("");
  const open = (p: string) => { setPlan(p); dialogRef.current?.showModal(); window.setTimeout(() => dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus(), 30); };
  return <section id="plans" className="plans section-pad page-gutter">
    <div className="section-kicker"><span>06 / MEMBERSHIP</span><span>CHOOSE YOUR COMMITMENT</span></div>
    <div className="section-heading-row"><h2>FIND THE PLAN<br /><em>THAT FITS YOU.</em></h2><p>Pricing is shared directly by the Niwara team. Choose a duration and we'll get back to you.</p></div>
    <div className="plan-grid">{plans.map(([name, len], i) => <article className="plan-card" key={name}><span className="plan-index">0{i + 1}</span><h3>{name}</h3><p>{len}</p><Button variant={i === 3 ? "dark" : "outlineEditorial"} size="editorial" onClick={() => open(name)} aria-label={`Get pricing for ${name.toLowerCase()} membership`}>GET PRICING <ArrowUpRight /></Button></article>)}</div>
    <div className="section-cta"><WhatsAppButton label="ASK ON WHATSAPP" /></div>
    <dialog ref={dialogRef} className="pricing-dialog" aria-labelledby="pricing-title" onClick={e => { if (e.target === dialogRef.current) dialogRef.current?.close(); }}>
      <div className="dialog-inner">
        <div className="dialog-head"><h3 id="pricing-title">GET MEMBERSHIP PRICING</h3><button type="button" className="dialog-close" onClick={() => dialogRef.current?.close()} aria-label="Close pricing form"><X /></button></div>
        {plan && <LeadForm key={plan} id="pricing-form" type="pricing" fields={["name", "phone", "email", "duration", "message"]} defaultDuration={planDuration[plan] ?? ""} submitLabel="GET MEMBERSHIP PRICING" successTitle="THANK YOU." successText="Thanks! Your enquiry has been received. The Niwara Gym team will get in touch with you." />}
      </div>
    </dialog>
  </section>;
}

export function BookVisit() {
  return <section id="visit" className="visit section-pad page-gutter">
    <div className="section-kicker"><span>07 / FREE VISIT</span><span>COME SEE FOR YOURSELF</span></div>
    <div className="visit-layout">
      <div><h2>SEE THE GYM<br /><em>BEFORE YOU JOIN.</em></h2><p>Visit Niwara Gym, explore the facilities and speak with the team about your fitness goals.</p><p className="visit-note">Visit requests are confirmed by the team based on availability.</p><div className="hero-actions"><Button variant="light" size="editorial" onClick={() => focusForm("visit-form")}>BOOK A FREE VISIT <ArrowUpRight /></Button><WhatsAppButton variant="transparent" /></div></div>
      <div className="visit-form-wrap"><LeadForm id="visit-form" type="visit" fields={["name", "phone", "date", "time", "goal"]} submitLabel="REQUEST A VISIT" successTitle="REQUEST RECEIVED." successText="Thanks! The Niwara Gym team will contact you to confirm a suitable visit time." /></div>
    </div>
  </section>;
}

type Cat = "GYM" | "EQUIPMENT" | "TRAINING" | "TRAINERS" | "FACILITIES";
// Replace / extend with real Niwara photographs as they are supplied.
const gallery: { src: string; alt: string; cat: Cat }[] = [
  { src: heroImage, alt: "Deadlift on the training floor", cat: "TRAINING" },
  { src: equipmentImage, alt: "Weights and training equipment", cat: "EQUIPMENT" },
  { src: trainingImage, alt: "Cable strength training", cat: "GYM" },
  { src: coachingImage, alt: "Trainer guiding a workout", cat: "TRAINERS" },
  { src: trainerOneImage, alt: "Coach in the training space", cat: "TRAINERS" },
  { src: trainerTwoImage, alt: "Coach ready for a session", cat: "FACILITIES" },
];
const filters = ["ALL", "GYM", "EQUIPMENT", "TRAINING", "TRAINERS", "FACILITIES"] as const;
export function Gallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("ALL");
  const [index, setIndex] = useState<number | null>(null);
  const items = filter === "ALL" ? gallery : gallery.filter(g => g.cat === filter);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const step = useCallback((d: number) => setIndex(i => i === null ? i : (i + d + items.length) % items.length), [items.length]);
  useEffect(() => { if (index !== null && !dialogRef.current?.open) dialogRef.current?.showModal(); }, [index]);
  const close = () => { dialogRef.current?.close(); };
  return <section id="gallery" className="gallery section-pad page-gutter">
    <div className="section-kicker"><span>08 / GALLERY</span><span>A LOOK INSIDE</span></div>
    <div className="section-heading-row"><h2>INSIDE<br /><em>NIWARA.</em></h2><p>Photographs are illustrative and will be replaced with real Niwara imagery as it's supplied.</p></div>
    <div className="gallery-filters" role="group" aria-label="Filter gallery">{filters.map(f => <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>)}</div>
    {items.length ? <div className="gallery-grid">{items.map((g, i) => <button type="button" key={g.src + g.cat} className="gallery-item" onClick={() => setIndex(i)} aria-label={`Open image: ${g.alt}`}><img src={g.src} alt={g.alt} loading="lazy" width={800} height={800} /><span>{g.cat}</span></button>)}</div> : <p className="gallery-empty">More photographs coming soon.</p>}
    <dialog ref={dialogRef} className="lightbox" aria-label="Image viewer" onClose={() => setIndex(null)}
      onKeyDown={e => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}
      onTouchStart={e => { touchX.current = e.touches[0]?.clientX ?? null; }}
      onTouchEnd={e => { if (touchX.current === null) return; const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current; if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1); touchX.current = null; }}>
      {index !== null && items[index] && <>
        <img src={items[index].src} alt={items[index].alt} />
        <p className="lightbox-caption">{items[index].alt} · {index + 1} / {items.length}</p>
        <button type="button" className="lightbox-btn lightbox-close" onClick={close} aria-label="Close image viewer"><X /></button>
        <button type="button" className="lightbox-btn lightbox-prev" onClick={() => step(-1)} aria-label="Previous image"><ArrowLeft /></button>
        <button type="button" className="lightbox-btn lightbox-next" onClick={() => step(1)} aria-label="Next image"><ArrowRight /></button>
      </>}
    </dialog>
  </section>;
}

export function Testimonials() {
  return <section id="reviews" className="testimonials section-pad page-gutter">
    <div className="section-kicker"><span>09 / REVIEWS</span><span>IN THEIR WORDS</span></div>
    <div className="section-heading-row"><h2>WHAT OUR<br /><em>MEMBERS SAY.</em></h2><p>Only genuine member reviews appear here.</p></div>
    {testimonials.length ? <div className="testimonial-grid">{testimonials.map(t => <figure key={t.firstName + t.text.slice(0, 12)} className="testimonial"><div aria-label={`${t.rating} out of 5 stars`}>{Array.from({ length: t.rating }, (_, i) => <Star key={i} size={14} fill="currentColor" aria-hidden="true" />)}</div><blockquote>{t.text}</blockquote><figcaption>— {t.firstName}</figcaption></figure>)}</div>
      : <div className="testimonial-empty"><p>Member reviews will be shared here soon. In the meantime, read what people say about Niwara on Google.</p></div>}
    <div className="review-cta"><div><span>LOVE YOUR TRAINING EXPERIENCE?</span><h3>READ OUR GOOGLE REVIEWS</h3></div><Button asChild variant="light" size="editorial"><a href={reviewsUrl} target="_blank" rel="noopener noreferrer">READ MORE REVIEWS <ArrowUpRight /></a></Button></div>
  </section>;
}

function bmiCategory(b: number) { return b < 18.5 ? "Underweight" : b < 25 ? "Healthy weight" : b < 30 ? "Overweight" : "Obesity"; }
export function BmiCalculator() {
  const [h, setH] = useState(""); const [w, setW] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const calc = (e: FormEvent) => { e.preventDefault(); const m = Number(h) / 100; const kg = Number(w); if (m > 0 && kg > 0) setBmi(kg / (m * m)); };
  return <section id="bmi" className="bmi section-pad page-gutter">
    <div className="section-kicker"><span>10 / FITNESS TOOL</span><span>A SIMPLE STARTING POINT</span></div>
    <div className="bmi-layout">
      <h2>CHECK<br /><em>YOUR BMI.</em></h2>
      <div>
        <form className="bmi-form" onSubmit={calc}>
          <label>HEIGHT (CM)<input required type="number" inputMode="decimal" min={100} max={250} step="0.1" value={h} onChange={e => setH(e.target.value)} placeholder="e.g. 172" /></label>
          <label>WEIGHT (KG)<input required type="number" inputMode="decimal" min={25} max={300} step="0.1" value={w} onChange={e => setW(e.target.value)} placeholder="e.g. 70" /></label>
          <Button variant="dark" size="editorial" type="submit">CALCULATE <ArrowRight /></Button>
        </form>
        <div className="bmi-result" aria-live="polite">{bmi !== null && <><span>YOUR BMI</span><strong>{bmi.toFixed(1)}</strong><p>{bmiCategory(bmi)}</p></>}</div>
        <p className="bmi-disclaimer">BMI is a general screening measure and does not account for every individual's body composition or health circumstances.</p>
        <div className="bmi-cta"><span>WANT HELP WITH YOUR FITNESS GOALS?</span><Button variant="outlineEditorial" size="editorial" onClick={talkToTrainer}>TALK TO A TRAINER <ArrowUpRight /></Button></div>
      </div>
    </div>
  </section>;
}

const contactNote = "Please contact the gym for the latest information.";
const faqs: [string, string][] = [
  ["Is Niwara Gym suitable for beginners?", "Yes. The gym is suitable for beginners, intermediate members and experienced lifters, with trainer guidance available to help you get started."],
  ["What are the membership fees?", `Monthly, quarterly, half-yearly and yearly memberships are available. ${contactNote}`],
  ["Do you provide personal training?", `Trainer guidance and personalized attention are available. ${contactNote}`],
  ["What are the gym timings?", `The gym opens at ${openingHours.opens}. ${openingHours.note}`],
  ["Do you offer trial or visit sessions?", "You can request a free visit to see the gym and speak with the team. Visits are confirmed based on availability."],
  ["Is parking available?", "Yes — free, on-site parking is available, including a wheelchair-accessible car park."],
  ["What equipment is available?", "Cable machines, strength equipment, free weights, machine-based training and cardio equipment. For specific equipment, please contact the gym."],
  ["What payment methods are accepted?", "Credit cards, debit cards and NFC mobile payments are accepted."],
  ["Do you have accessible facilities?", "Yes — a wheelchair-accessible car park, entrance, seating and toilet."],
];
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return <section id="faq" className="faq section-pad page-gutter">
    <div className="section-kicker"><span>11 / FAQS</span><span>GOOD QUESTIONS</span></div>
    <div className="faq-layout"><h2>FREQUENTLY<br /><em>ASKED.</em></h2>
      <div className="faq-list">{faqs.map(([q, a], i) => <div key={q} className="faq-item"><h3><button type="button" id={`faq-q-${i}`} aria-expanded={open === i} aria-controls={`faq-a-${i}`} onClick={() => setOpen(open === i ? null : i)}><span>{q}</span><Plus aria-hidden="true" /></button></h3><div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={open !== i}><p>{a}</p></div></div>)}</div>
    </div>
  </section>;
}

export function OpeningHours({ dark = false }: { dark?: boolean }) {
  return <div className={`opening-hours ${dark ? "opening-hours-dark" : ""}`}><Clock3 size={20} strokeWidth={1.5} aria-hidden="true" /><div><span>OPENING TIME</span><strong>{openingHours.opens}</strong>{openingHours.closes ? <p>Closes {openingHours.closes}</p> : <p>{openingHours.note}</p>}</div></div>;
}

export function MobileActionBar() {
  return <nav className="mobile-action-bar" aria-label="Quick contact">
    <a href={business.phoneHref}><Phone size={17} aria-hidden="true" />CALL</a>
    <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} aria-hidden="true" />WHATSAPP</a>
    <a href={directionsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={17} aria-hidden="true" />DIRECTIONS</a>
  </nav>;
}
