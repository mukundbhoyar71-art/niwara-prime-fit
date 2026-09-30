import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Clock3, CreditCard, Dumbbell, Menu, ParkingCircle, Phone, ShowerHead, MapPin, Accessibility, X, CircleParking, WalletCards, Sparkles, Users, Target, Armchair, DoorOpen, Toilet, Trees, Bath, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm, focusForm } from "@/components/niwara/LeadForm";
import { WhatsAppButton } from "@/components/niwara/WhatsAppButton";
import { BmiCalculator, BookVisit, Equipment, Faq, Gallery, MobileActionBar, OpeningHours, Plans, Programs, QuickBar, Testimonials, talkToTrainer } from "@/components/niwara/sections";
import { business, directionsUrl } from "@/lib/site-config";
import heroImage from "@/assets/niwara-hero.jpg";
import equipmentImage from "@/assets/niwara-equipment.jpg";
import trainingImage from "@/assets/niwara-training.jpg";
import coachingImage from "@/assets/niwara-coaching.jpg";
import trainerOneImage from "@/assets/niwara-trainer-one.jpg";
import trainerTwoImage from "@/assets/niwara-trainer-two.jpg";

const address = business.address;
const directions = directionsUrl;
const telHref = business.phoneHref;
const footerLinks = [["HOME", "#home"], ["ABOUT", "#about"], ["FACILITIES", "#facilities"], ["TRAINERS", "#trainers"], ["MEMBERSHIP", "#plans"], ["GALLERY", "#gallery"], ["FAQS", "#faq"], ["CONTACT", "#contact"]] as const;
const seoTitle = "Niwara Gym by V3 Fitness | Gym in Navi Peth, Pune";
const seoDescription = "Niwara Gym by V3 Fitness is a fitness center in Navi Peth, Pune, offering modern equipment, a spacious training environment and trainer guidance.";
const localBusiness = {
  "@context": "https://schema.org", "@type": "HealthClub", name: business.name, telephone: "+91-98603-30423",
  address: { "@type": "PostalAddress", streetAddress: "Niwara Campus, 96, Navi Peth, Thosarpaga", addressLocality: "Pune", addressRegion: "Maharashtra", postalCode: "411030", addressCountry: "IN" },
  paymentAccepted: "Credit card, Debit card, NFC mobile payments",
};
const navItems = [
  ["HOME", "#home"], ["ABOUT", "#about"], ["FACILITIES", "#facilities"],
  ["TRAINERS", "#trainers"], ["MEMBERSHIP", "#plans"], ["GALLERY", "#gallery"], ["CONTACT", "#contact"],
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: seoTitle },
      { name: "description", content: seoDescription },
      { property: "og:title", content: seoTitle },
      { property: "og:description", content: seoDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(localBusiness) }],
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
      <h1>TRAIN STRONG.<br /><span>LIVE STRONG.</span></h1>
      <p className="hero-support">A modern fitness center in Navi Peth, Pune with quality equipment, a spacious training environment and supportive trainer guidance.</p>
      <div className="hero-actions"><Button asChild variant="light" size="editorial"><a href="#membership">JOIN NOW <ArrowUpRight /></a></Button><Button variant="transparent" size="editorial" onClick={() => focusForm("visit-form")}>BOOK A FREE VISIT <ArrowRight /></Button></div>
      <div className="hero-subtle"><a href={telHref}><Phone size={14} aria-hidden="true" /> CALL NOW · {business.phoneDisplay}</a><WhatsAppButton variant="transparent" label="WHATSAPP" className="hero-wa" /></div>
    </div>
     <div className="hero-bottom page-gutter"><a href="#about" aria-label="Scroll to about Niwara"><span className="scroll-rule" /> SCROLL TO EXPLORE <ArrowDown size={15} /></a><span>NAVI PETH, PUNE · BUILT FOR PROGRESS</span></div>
  </section>;
}

function BrandStatement() {
  return <section id="about" className="statement section-pad page-gutter">
    <div className="section-kicker"><span>01 / OUR PHILOSOPHY</span><span>TRAINING WITH INTENTION</span></div>
    <div className="statement-layout"><h2>MORE THAN<br />A GYM.<br /><em>A PLACE TO BUILD YOUR STRONGEST SELF.</em></h2><div className="statement-copy"><span className="small-cross">✳</span><p>Niwara Gym by V3 Fitness provides a spacious and motivating environment for people who want to train consistently and work toward their fitness goals.</p><p className="suited-label">SUITABLE FOR</p><ul className="suited-list">{["Beginners", "Intermediate members", "Experienced lifters", "General fitness", "Strength & conditioning goals"].map(x => <li key={x}>{x}</li>)}</ul><a href="#experience" className="text-link">THE NIWARA EXPERIENCE <ArrowUpRight size={17} /></a></div></div>
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
  { image: trainerOneImage, alt: "Illustrative portrait of a male fitness coach", title: "COACH PROFILE 01", specialty: "STRENGTH & CONDITIONING", copy: "Meet the team behind your training. Individual trainer details are coming soon.", experience: "To be added", certifications: "To be added" },
  { image: trainerTwoImage, alt: "Illustrative portrait of a female fitness coach", title: "COACH PROFILE 02", specialty: "GENERAL FITNESS", copy: "Personal guidance that meets you where you are. Individual trainer details are coming soon.", experience: "To be added", certifications: "To be added" },
];
function Trainers() {
  return <section id="trainers" className="trainers section-pad page-gutter"><div className="section-kicker"><span>04 / OUR PEOPLE</span><span>BETTER TOGETHER</span></div><div className="section-heading-row"><h2>TRAIN WITH<br /><em>EXPERT GUIDANCE.</em></h2><p>Support when you need it. Encouragement at every stage. Get to know the people helping you move forward.</p></div><div className="trainer-grid">{trainers.map((trainer) => <article className="trainer-card" key={trainer.title}><div className="trainer-image"><img src={trainer.image} alt={trainer.alt} loading="lazy" width={800} height={1000} /></div><div className="trainer-title"><h3>{trainer.title}</h3><ArrowUpRight aria-hidden="true" size={20} /></div><p className="trainer-specialty">{trainer.specialty}</p><dl className="trainer-facts"><div><dt>EXPERIENCE</dt><dd>{trainer.experience}</dd></div><div><dt>CERTIFICATIONS</dt><dd>{trainer.certifications}</dd></div></dl><p className="trainer-copy">{trainer.copy}</p></article>)}</div><p className="trainer-disclaimer">Portraits are illustrative; trainer names and profiles will be added when provided.</p><div className="section-cta"><Button variant="dark" size="editorial" onClick={talkToTrainer}>TALK TO A TRAINER <ArrowUpRight /></Button></div></section>;
}

function WhyNiwara() {
  const highlights = ["MODERN EQUIPMENT", "SPACIOUS ENVIRONMENT", "EXPERT TRAINER GUIDANCE", "PERSONALIZED ATTENTION", "DIET GUIDANCE", "ACCESSIBLE FACILITIES"];
  return <section className="why section-pad page-gutter"><div className="section-kicker"><span>05 / WHY NIWARA</span><span>THE WAY WE TRAIN</span></div><div className="why-layout"><div><h2>WHY<br /><em>NIWARA?</em></h2><p>A space that puts your progress first, from the equipment you use to the people beside you.</p></div><div className="why-list">{highlights.map((label, i) => <div key={label}><span>0{i + 1}</span><h3>{label}</h3><ArrowUpRight size={18} aria-hidden="true" /></div>)}</div></div></section>;
}

function ContactForm() {
  return <LeadForm id="contact-form" type="membership" fields={["name", "phone", "email", "goal", "visitTime", "message"]} requireEmail submitLabel="SEND ENQUIRY" whatsappInstead successText="Thanks! Your enquiry has been received. The Niwara Gym team will get in touch with you." />;
}

function Membership() {
  return <section id="membership" className="membership section-pad page-gutter"><div className="section-kicker"><span>12 / YOUR NEXT STEP</span><span>LET'S GET TO WORK</span></div><div className="membership-layout"><div className="membership-intro"><h2>READY TO<br /><em>START TRAINING?</em></h2><p>Join Niwara Gym by V3 Fitness and take the next step toward a stronger, healthier and more consistent lifestyle.</p><div className="membership-actions"><Button asChild variant="dark" size="editorial"><a href="#enquiry">ENQUIRE NOW <ArrowUpRight /></a></Button><Button asChild variant="outlineEditorial" size="editorial"><a href={telHref}>CALL THE GYM <Phone /></a></Button><WhatsAppButton /></div><div className="membership-note"><span>YOUR TRAINING STARTS HERE</span><ArrowRight size={35} strokeWidth={1} /></div></div><div id="enquiry" className="form-area"><div className="form-header"><span>MEMBERSHIP ENQUIRY</span><span>01 — 06</span></div><ContactForm /></div></div></section>;
}

const amenities = [
  { icon: ParkingCircle, label: "Wheelchair-accessible car park" }, { icon: DoorOpen, label: "Wheelchair-accessible entrance" }, { icon: Armchair, label: "Wheelchair-accessible seating" }, { icon: Accessibility, label: "Wheelchair-accessible toilet" },
  { icon: Trees, label: "Outdoor services" }, { icon: Bath, label: "Restroom" }, { icon: ShowerHead, label: "Shower" }, { icon: CircleParking, label: "Free parking" },
  { icon: ParkingCircle, label: "On-site parking" }, { icon: Users, label: "Membership required" }, { icon: CreditCard, label: "Credit cards" }, { icon: WalletCards, label: "Debit cards" }, { icon: Smartphone, label: "NFC mobile payments" },
];
function Amenities() {
  return <section className="amenities section-pad page-gutter"><div className="section-kicker"><span>13 / GOOD TO KNOW</span><span>THE PRACTICAL DETAILS</span></div><div className="amenities-heading"><h2>THE DETAILS<br /><em>MATTER.</em></h2><p>Everything you need to feel at home, before and after the work.</p></div><div className="amenities-grid">{amenities.map(({ icon: Icon, label }) => <div className="amenity" key={label}><Icon size={24} strokeWidth={1.35} aria-hidden="true" /><span>{label}</span></div>)}</div></section>;
}

function Location() {
  return <section id="contact" className="location section-pad page-gutter"><div className="section-kicker"><span>14 / FIND US</span><span>RIGHT HERE IN PUNE</span></div><div className="section-heading-row"><h2>FIND<br /><em>NIWARA.</em></h2><p>Your next session starts right here in Navi Peth.</p></div><div className="location-layout"><div className="location-info"><div className="location-block"><span className="location-label">VISIT THE GYM</span><address><strong>Niwara Gym by V3 Fitness</strong><br />Niwara Campus<br />96, Navi Peth, Thosarpaga<br />Pune, Maharashtra 411030</address></div><div className="location-block"><span className="location-label">GIVE US A CALL</span><a className="location-phone" href={telHref}>098603 30423</a></div><OpeningHours /><div className="location-actions"><Button asChild variant="dark" size="editorial"><a href={directions} target="_blank" rel="noopener noreferrer">GET DIRECTIONS <ArrowUpRight /></a></Button><Button asChild variant="outlineEditorial" size="editorial"><a href={telHref}>CALL NOW <Phone /></a></Button><WhatsAppButton /></div></div><div className="map-frame"><iframe title="Map showing Niwara Gym by V3 Fitness in Navi Peth, Pune" src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a href={directions} target="_blank" rel="noopener noreferrer" className="map-badge"><MapPin size={17} /> NIWARA GYM, PUNE <ArrowUpRight size={16} /></a></div></div></section>;
}

function Footer() {
  return <footer className="footer page-gutter"><div className="footer-top"><div><Brand inverse /><p>TRAIN HARD. LIVE STRONG.</p></div><div className="footer-links"><span>EXPLORE</span>{footerLinks.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div><div className="footer-contact"><span>COME FIND US</span><address>{address}</address><a href={telHref}>098603 30423</a><div className="footer-actions"><a href={telHref}>CALL</a><a href={`https://wa.me/${business.whatsappNumber}`} target="_blank" rel="noopener noreferrer">WHATSAPP</a><a href={directions} target="_blank" rel="noopener noreferrer">GET DIRECTIONS</a></div><div className="social-placeholders" aria-label="Social profiles coming soon"><span title="Instagram coming soon">IG</span><span title="Facebook coming soon">FB</span></div></div></div><div className="footer-bottom"><span>© 2026 NIWARA GYM BY V3 FITNESS</span><span>BUILT FOR THE WORK. MADE FOR THE JOURNEY.</span><a href="#home">BACK TO TOP ↑</a></div></footer>;
}

function HomePage() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = document.querySelectorAll(".section-kicker, .statement-layout, .section-heading-row, .facility-card, .experience-image, .experience-content > div:last-child, .trainer-card, .why-layout, .membership-layout, .amenities-heading, .amenity, .location-layout, .program-card, .plan-card, .equipment-layout, .visit-layout, .gallery-grid, .faq-layout, .bmi-layout");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    targets.forEach((target) => {
      if (target.getBoundingClientRect().top > window.innerHeight + 20) {
        target.classList.add("reveal-ready");
        observer.observe(target);
      }
    });
    return () => observer.disconnect();
  }, []);
  return <><Navbar /><main><Hero /><QuickBar /><BrandStatement /><Facilities /><Equipment /><TrainingExperience /><Programs /><Trainers /><WhyNiwara /><Plans /><BookVisit /><Gallery /><Testimonials /><BmiCalculator /><Faq /><Membership /><Amenities /><Location /></main><Footer /><MobileActionBar /></>;
}
