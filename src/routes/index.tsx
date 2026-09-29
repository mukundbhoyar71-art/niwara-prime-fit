import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Clock3, CreditCard, Dumbbell, Menu, ParkingCircle, Phone, ShowerHead, MapPin, Accessibility, X, CircleParking, WalletCards, Sparkles, Users, Target, Armchair, DoorOpen, Toilet, Trees, Bath, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitEnquiry } from "@/lib/enquiries.functions";
import heroImage from "@/assets/niwara-hero.jpg";
import equipmentImage from "@/assets/niwara-equipment.jpg";
import trainingImage from "@/assets/niwara-training.jpg";
import coachingImage from "@/assets/niwara-coaching.jpg";
import trainerOneImage from "@/assets/niwara-trainer-one.jpg";
import trainerTwoImage from "@/assets/niwara-trainer-two.jpg";

const address = "Niwara Campus, 96, Navi Peth, Thosarpaga, Pune, Maharashtra 411030";
const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const navItems = [
  ["HOME", "#home"], ["ABOUT", "#about"], ["FACILITIES", "#facilities"],
  ["TRAINERS", "#trainers"], ["MEMBERSHIP", "#membership"], ["CONTACT", "#contact"],
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Niwara Gym by V3 Fitness | Premium Fitness Center in Pune" },
      { name: "description", content: "Niwara Gym by V3 Fitness is a modern fitness center in Navi Peth, Pune offering quality equipment, expert trainer guidance and a motivating training environment." },
      { property: "og:title", content: "Niwara Gym by V3 Fitness | Premium Fitness Center in Pune" },
      { property: "og:description", content: "Train with purpose at Niwara Gym by V3 Fitness in Navi Peth, Pune. Explore our training space, guidance and membership enquiries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function Brand({ inverse = false }: { inverse?: boolean }) {
  return <a href="#home" className={`brand ${inverse ? "brand-dark" : ""}`} aria-label="Niwara Gym by V3 Fitness — home"><span className="brand-main">NIWARA<span className="brand-gym">GYM</span></span><span className="brand-sub">BY V3 FITNESS</span></a>;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 64);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return <>
    <header className={`site-header ${scrolled || open ? "site-header-solid" : ""}`}>
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav>
        <Button asChild variant="nav" className="desktop-join"><a href="#membership">JOIN NOW <ArrowUpRight aria-hidden="true" /></a></Button>
        <Button variant="iconNav" size="icon" className="mobile-menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</Button>
      </div>
    </header>
    <div className={`mobile-menu ${open ? "mobile-menu-open" : ""}`} aria-hidden={!open}>
      <nav aria-label="Mobile navigation">{navItems.map(([label, href], index) => <a href={href} key={label} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}<ArrowUpRight aria-hidden="true" /></a>)}</nav>
      <p>NIWARA CAMPUS · NAVI PETH, PUNE</p>
    </div>
  </>;
}

function Hero() {
  return <section id="home" className="hero">
    <img className="hero-image" src={heroImage} alt="Athlete deadlifting in a dramatic, modern training space" width={1920} height={1200} fetchPriority="high" />
    <div className="hero-shade" />
    <div className="hero-content page-gutter">
      <span className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> NIWARA GYM BY V3 FITNESS</span>
      <h1>TRAIN HARD.<br /><span>LIVE STRONG.</span></h1>
      <p>YOUR FITNESS. YOUR DISCIPLINE. YOUR TRANSFORMATION.</p>
      <div className="hero-actions"><Button asChild variant="light" size="editorial"><a href="#membership">START TRAINING <ArrowUpRight /></a></Button><Button asChild variant="transparent" size="editorial"><a href="#facilities">EXPLORE THE GYM <ArrowRight /></a></Button></div>
    </div>
    <div className="hero-bottom page-gutter"><a href="#about" aria-label="Scroll to about Niwara"><span className="scroll-rule" /> SCROLL TO EXPLORE <ArrowDown size={15} /></a><span>EST. IN PUNE · BUILT FOR PROGRESS</span></div>
  </section>;
}

function BrandStatement() {
  return <section id="about" className="statement section-pad page-gutter">
    <div className="section-kicker"><span>01 / OUR PHILOSOPHY</span><span>TRAINING WITH INTENTION</span></div>
    <div className="statement-layout"><h2>MORE THAN<br />A GYM.<br /><em>A PLACE TO BUILD YOUR STRONGEST SELF.</em></h2><div className="statement-copy"><span className="small-cross">✳</span><p>Niwara Gym by V3 Fitness is a modern fitness destination in Pune designed to help you train with purpose, consistency and confidence.</p><p>Whether you're beginning your fitness journey or pushing toward your next level, our space, equipment and trainers are here to support you.</p><a href="#experience" className="text-link">THE NIWARA EXPERIENCE <ArrowUpRight size={17} /></a></div></div>
  </section>;
}

const facilities = [
  { title: "MODERN EQUIPMENT", copy: "A wide range of modern, well-maintained training equipment.", image: equipmentImage, alt: "Modern weights and training equipment arranged across a gym floor" },
  { title: "SPACIOUS TRAINING FLOOR", copy: "A clean, spacious environment designed for comfortable workouts.", image: trainingImage, alt: "Strength training in an open gym environment" },
  { title: "EXPERT TRAINERS", copy: "Knowledgeable trainers providing guidance and personalized attention.", image: coachingImage, alt: "Trainer providing attentive guidance during a workout" },
  { title: "PERSONALIZED GUIDANCE", copy: "Training support tailored to individual goals and fitness levels.", image: trainerOneImage, alt: "Fitness coach in a modern training space" },
  { title: "DIET & FITNESS GUIDANCE", copy: "Practical advice to help members build sustainable habits.", image: trainerTwoImage, alt: "Fitness coach ready to provide training guidance" },
  { title: "POSITIVE TRAINING ENVIRONMENT", copy: "A motivating atmosphere that makes training enjoyable.", image: heroImage, alt: "Athlete training with focus in the gym" },
];
function Facilities() {
  return <section id="facilities" className="facilities section-pad page-gutter">
    <div className="section-kicker"><span>02 / THE SPACE</span><span>EVERY DETAIL MATTERS</span></div>
    <div className="section-heading-row"><h2>BUILT FOR<br /><em>BETTER TRAINING.</em></h2><p>Thoughtfully equipped. Intentionally designed. Everything you need to keep showing up and moving forward.</p></div>
    <div className="facility-grid">{facilities.map((item, index) => <article className={`facility-card facility-card-${index + 1}`} key={item.title}><div className="facility-image-wrap"><img src={item.image} alt={item.alt} loading="lazy" width={1200} height={900} /></div><div className="facility-meta"><span>0{index + 1} / 06</span><ArrowUpRight size={17} aria-hidden="true" /></div><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
  </section>;
}

function TrainingExperience() {
  return <section id="experience" className="experience"><div className="experience-image"><img src={trainingImage} alt="Athlete performing cable strength training in the gym" loading="lazy" width={1200} height={1500} /></div><div className="experience-content"><div className="section-kicker"><span>03 / THE EXPERIENCE</span><span>WORK WITH INTENTION</span></div><div><h2>TRAIN<br />WITH<br /><em>PURPOSE.</em></h2><p>Real progress begins with a clear purpose. Find your rhythm through strength, conditioning and general fitness, with personal guidance to help you keep going.</p><div className="experience-tags"><span>STRENGTH</span><span>CONDITIONING</span><span>GENERAL FITNESS</span><span>CONSISTENCY</span><span>PERSONAL GUIDANCE</span></div><Button asChild variant="dark" size="editorial"><a href="#membership">DISCOVER OUR TRAINING <ArrowUpRight /></a></Button></div></div></section>;
}

const trainers = [
  { image: trainerOneImage, alt: "Illustrative portrait of a male fitness coach", title: "COACH PROFILE 01", specialty: "STRENGTH & CONDITIONING", copy: "Meet the team behind your training. Individual trainer details are coming soon." },
  { image: trainerTwoImage, alt: "Illustrative portrait of a female fitness coach", title: "COACH PROFILE 02", specialty: "GENERAL FITNESS", copy: "Personal guidance that meets you where you are. Individual trainer details are coming soon." },
];
function Trainers() {
  return <section id="trainers" className="trainers section-pad page-gutter"><div className="section-kicker"><span>04 / OUR PEOPLE</span><span>BETTER TOGETHER</span></div><div className="section-heading-row"><h2>TRAIN WITH<br /><em>EXPERT GUIDANCE.</em></h2><p>Support when you need it. Encouragement at every stage. Get to know the people helping you move forward.</p></div><div className="trainer-grid">{trainers.map((trainer) => <article className="trainer-card" key={trainer.title}><div className="trainer-image"><img src={trainer.image} alt={trainer.alt} loading="lazy" width={800} height={1000} /></div><div className="trainer-title"><h3>{trainer.title}</h3><ArrowUpRight aria-hidden="true" size={20} /></div><p className="trainer-specialty">{trainer.specialty}</p><p className="trainer-copy">{trainer.copy}</p></article>)}</div><p className="trainer-disclaimer">Portraits are illustrative; trainer names and profiles will be added when provided.</p></section>;
}

function WhyNiwara() {
  const highlights = ["MODERN EQUIPMENT", "SPACIOUS ENVIRONMENT", "EXPERT TRAINER GUIDANCE", "PERSONALIZED ATTENTION", "DIET GUIDANCE", "ACCESSIBLE FACILITIES"];
  return <section className="why section-pad page-gutter"><div className="section-kicker"><span>05 / WHY NIWARA</span><span>THE WAY WE TRAIN</span></div><div className="why-layout"><div><h2>WHY<br /><em>NIWARA?</em></h2><p>A space that puts your progress first, from the equipment you use to the people beside you.</p></div><div className="why-list">{highlights.map((label, i) => <div key={label}><span>0{i + 1}</span><h3>{label}</h3><ArrowUpRight size={18} aria-hidden="true" /></div>)}</div></div></section>;
}

const emptyForm = { name: "", phone: "", email: "", fitness_goal: "", preferred_training_time: "", message: "", website: "" };
function ContactForm() {
  const [values, setValues] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const update = (key: keyof typeof emptyForm, value: string) => setValues(v => ({ ...v, [key]: value }));
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending"); setErrorMessage("");
    try { await submitEnquiry({ data: values }); setStatus("success"); setValues(emptyForm); }
    catch (error) { setErrorMessage(error instanceof Error ? error.message : "Please try again or call the gym."); setStatus("error"); }
  }
  if (status === "success") return <div className="form-success" role="status"><Check size={30} /><h3>ENQUIRY SENT.</h3><p>Thank you for getting in touch. Your enquiry has been received.</p><Button variant="outlineEditorial" size="editorial" onClick={() => setStatus("idle")}>SEND ANOTHER ENQUIRY <ArrowRight /></Button></div>;
  return <form className="enquiry-form" onSubmit={onSubmit}><div className="form-grid"><label>NAME <input required minLength={2} maxLength={100} autoComplete="name" placeholder="Your full name" value={values.name} onChange={e => update("name", e.target.value)} /></label><label>PHONE <input required type="tel" minLength={8} maxLength={25} autoComplete="tel" placeholder="Your phone number" value={values.phone} onChange={e => update("phone", e.target.value)} /></label><label>EMAIL <input required type="email" maxLength={200} autoComplete="email" placeholder="Your email address" value={values.email} onChange={e => update("email", e.target.value)} /></label><label>FITNESS GOAL <span className="select-wrap"><select required value={values.fitness_goal} onChange={e => update("fitness_goal", e.target.value)}><option value="" disabled>Select your goal</option><option>Strength</option><option>Conditioning</option><option>General fitness</option><option>Other / Not sure yet</option></select><ChevronDown size={16} aria-hidden="true" /></span></label><label className="full-field">PREFERRED TRAINING TIME <span className="select-wrap"><select required value={values.preferred_training_time} onChange={e => update("preferred_training_time", e.target.value)}><option value="" disabled>Select a time</option><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Flexible</option></select><ChevronDown size={16} aria-hidden="true" /></span></label><label className="full-field">MESSAGE <textarea rows={3} maxLength={2000} placeholder="Tell us a little about what you're looking for..." value={values.message} onChange={e => update("message", e.target.value)} /></label></div><div className="honeypot" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={values.website} onChange={e => update("website", e.target.value)} /></label></div>{status === "error" && <p className="form-error" role="alert">{errorMessage}</p>}<Button variant="dark" size="editorial" type="submit" disabled={status === "sending"}>{status === "sending" ? "SENDING..." : "SEND ENQUIRY"} <ArrowUpRight /></Button></form>;
}

function Membership() {
  return <section id="membership" className="membership section-pad page-gutter"><div className="section-kicker"><span>06 / YOUR NEXT STEP</span><span>LET'S GET TO WORK</span></div><div className="membership-layout"><div className="membership-intro"><h2>READY TO<br /><em>START TRAINING?</em></h2><p>Join Niwara Gym by V3 Fitness and take the next step toward a stronger, healthier and more consistent lifestyle.</p><div className="membership-actions"><Button asChild variant="dark" size="editorial"><a href="#enquiry">ENQUIRE NOW <ArrowUpRight /></a></Button><Button asChild variant="outlineEditorial" size="editorial"><a href="tel:+919860330423">CALL THE GYM <Phone /></a></Button></div><div className="membership-note"><span>YOUR TRAINING STARTS HERE</span><ArrowRight size={35} strokeWidth={1} /></div></div><div id="enquiry" className="form-area"><div className="form-header"><span>MEMBERSHIP ENQUIRY</span><span>01 — 06</span></div><ContactForm /></div></div></section>;
}

const amenities = [
  { icon: ParkingCircle, label: "Wheelchair-accessible car park" }, { icon: DoorOpen, label: "Wheelchair-accessible entrance" }, { icon: Armchair, label: "Wheelchair-accessible seating" }, { icon: Accessibility, label: "Wheelchair-accessible toilet" },
  { icon: Trees, label: "Outdoor services" }, { icon: Bath, label: "Restroom" }, { icon: ShowerHead, label: "Shower" }, { icon: CircleParking, label: "Free parking" },
  { icon: ParkingCircle, label: "On-site parking" }, { icon: Users, label: "Membership required" }, { icon: CreditCard, label: "Credit cards" }, { icon: WalletCards, label: "Debit cards" }, { icon: Smartphone, label: "NFC mobile payments" },
];
function Amenities() {
  return <section className="amenities section-pad page-gutter"><div className="section-kicker"><span>07 / GOOD TO KNOW</span><span>THE PRACTICAL DETAILS</span></div><div className="amenities-heading"><h2>THE DETAILS<br /><em>MATTER.</em></h2><p>Everything you need to feel at home, before and after the work.</p></div><div className="amenities-grid">{amenities.map(({ icon: Icon, label }) => <div className="amenity" key={label}><Icon size={24} strokeWidth={1.35} aria-hidden="true" /><span>{label}</span></div>)}</div></section>;
}

function Location() {
  return <section id="contact" className="location section-pad page-gutter"><div className="section-kicker"><span>08 / FIND US</span><span>RIGHT HERE IN PUNE</span></div><div className="section-heading-row"><h2>FIND YOUR<br /><em>TRAINING SPACE.</em></h2><p>Your next session starts right here in Navi Peth.</p></div><div className="location-layout"><div className="location-info"><div className="location-block"><span className="location-label">VISIT THE GYM</span><address>Niwara Campus<br />96, Navi Peth, Thosarpaga<br />Pune, Maharashtra 411030</address></div><div className="location-block"><span className="location-label">GIVE US A CALL</span><a className="location-phone" href="tel:+919860330423">098603 30423</a></div><div className="location-actions"><Button asChild variant="dark" size="editorial"><a href={directions} target="_blank" rel="noopener noreferrer">GET DIRECTIONS <ArrowUpRight /></a></Button><Button asChild variant="outlineEditorial" size="editorial"><a href="tel:+919860330423">CALL NOW <Phone /></a></Button></div></div><div className="map-frame"><iframe title="Map showing Niwara Gym by V3 Fitness in Navi Peth, Pune" src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a href={directions} target="_blank" rel="noopener noreferrer" className="map-badge"><MapPin size={17} /> NIWARA GYM, PUNE <ArrowUpRight size={16} /></a></div></div></section>;
}

function Footer() {
  return <footer className="footer page-gutter"><div className="footer-top"><div><Brand inverse /><p>TRAIN HARD. LIVE STRONG.</p></div><div className="footer-links"><span>EXPLORE</span>{navItems.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div><div className="footer-contact"><span>COME FIND US</span><address>{address}</address><a href="tel:+919860330423">098603 30423</a><div className="social-placeholders" aria-label="Social profiles coming soon"><span title="Instagram coming soon">IG</span><span title="Facebook coming soon">FB</span></div></div></div><div className="footer-bottom"><span>© 2026 NIWARA GYM BY V3 FITNESS</span><span>BUILT FOR THE WORK. MADE FOR THE JOURNEY.</span><a href="#home">BACK TO TOP ↑</a></div></footer>;
}

function HomePage() {
  return <><Navbar /><main><Hero /><BrandStatement /><Facilities /><TrainingExperience /><Trainers /><WhyNiwara /><Membership /><Amenities /><Location /></main><Footer /><a className="mobile-sticky-cta" href="#membership">JOIN NOW <ArrowUpRight size={18} aria-hidden="true" /></a></>;
}
