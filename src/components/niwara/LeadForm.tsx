import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitEnquiry } from "@/lib/enquiries.functions";
import { WhatsAppButton } from "./WhatsAppButton";

type Field = "name" | "phone" | "email" | "goal" | "time" | "visitTime" | "date" | "duration" | "message";
type EnquiryType = "membership" | "pricing" | "visit" | "trainer";

const goals = ["Strength", "Muscle building", "Weight loss", "Conditioning", "General fitness", "Beginner training", "Personal training", "Other / Not sure yet"];
const times = ["Morning", "Afternoon", "Evening", "Flexible"];
const durations = ["Monthly (1 month)", "Quarterly (3 months)", "Half-yearly (6 months)", "Yearly (12 months)", "Not sure yet"];

const empty = { name: "", phone: "", email: "", goal: "", time: "", date: "", duration: "", message: "", website: "" };

export function LeadForm({ id, type, fields, submitLabel, successTitle = "ENQUIRY SENT.", successText, requireEmail = false, whatsappInstead = false, defaultDuration = "" }: {
  id: string; type: EnquiryType; fields: Field[]; submitLabel: string; successTitle?: string; successText: string; requireEmail?: boolean; whatsappInstead?: boolean; defaultDuration?: string;
}) {
  const [values, setValues] = useState({ ...empty, duration: defaultDuration });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const has = (f: Field) => fields.includes(f);
  const set = (k: keyof typeof empty, v: string) => setValues(s => ({ ...s, [k]: v }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setStatus("sending"); setErrorMessage("");
    const time = has("date") ? [values.date && `Date: ${values.date}`, values.time && `Time: ${values.time}`].filter(Boolean).join(" · ") : values.time;
    try {
      await submitEnquiry({ data: {
        enquiry_type: type, name: values.name, phone: values.phone, email: values.email,
        fitness_goal: values.goal || (values.duration ? `Plan: ${values.duration}` : ""),
        preferred_training_time: time,
        message: [values.duration && has("goal") ? `Plan: ${values.duration}` : "", values.message].filter(Boolean).join(" — "),
        website: values.website,
      } });
      setStatus("success"); setValues({ ...empty, duration: defaultDuration });
    } catch (err) { setErrorMessage(err instanceof Error ? err.message : "Please try again or call the gym."); setStatus("error"); }
  }

  if (status === "success") return <div className="form-success" role="status"><Check size={30} aria-hidden="true" /><h3>{successTitle}</h3><p>{successText}</p><Button variant="outlineEditorial" size="editorial" onClick={() => setStatus("idle")}>SEND ANOTHER <ArrowRight /></Button></div>;

  const select = (key: "goal" | "time" | "duration", label: string, options: string[], placeholder: string, full = false) =>
    <label className={full ? "full-field" : ""}>{label} <span className="select-wrap"><select required value={values[key]} onChange={e => set(key, e.target.value)}><option value="" disabled>{placeholder}</option>{options.map(o => <option key={o}>{o}</option>)}</select><ChevronDown size={16} aria-hidden="true" /></span></label>;

  return <form id={id} className="enquiry-form" onSubmit={onSubmit} noValidate={false}>
    <div className="form-grid">
      {has("name") && <label>FULL NAME <input data-autofocus required minLength={2} maxLength={100} autoComplete="name" placeholder="Your full name" value={values.name} onChange={e => set("name", e.target.value)} /></label>}
      {has("phone") && <label>PHONE NUMBER <input required type="tel" minLength={8} maxLength={25} autoComplete="tel" placeholder="Your phone number" value={values.phone} onChange={e => set("phone", e.target.value)} /></label>}
      {has("email") && <label>EMAIL{!requireEmail && <small> (OPTIONAL)</small>} <input required={requireEmail} type="email" maxLength={200} autoComplete="email" placeholder="Your email address" value={values.email} onChange={e => set("email", e.target.value)} /></label>}
      {has("date") && <label>PREFERRED DATE <input required type="date" min={new Date().toISOString().slice(0, 10)} value={values.date} onChange={e => set("date", e.target.value)} /></label>}
      {has("goal") && select("goal", "FITNESS GOAL", goals, "Select your goal")}
      {has("duration") && select("duration", "MEMBERSHIP DURATION", durations, "Select a duration", !has("goal"))}
      {has("time") && select("time", "PREFERRED TIME", times, "Select a time")}
      {has("visitTime") && select("time", "PREFERRED VISIT TIME", times, "Select a time", true)}
      {has("message") && <label className="full-field">MESSAGE <textarea rows={3} maxLength={2000} placeholder="Tell us a little about what you're looking for..." value={values.message} onChange={e => set("message", e.target.value)} /></label>}
    </div>
    <div className="honeypot" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={values.website} onChange={e => set("website", e.target.value)} /></label></div>
    {status === "error" && <p className="form-error" role="alert">{errorMessage}</p>}
    <div className="form-buttons">
      <Button variant="dark" size="editorial" type="submit" disabled={status === "sending"}>{status === "sending" ? "SENDING..." : submitLabel} <ArrowUpRight /></Button>
      {whatsappInstead && <WhatsAppButton label="WHATSAPP INSTEAD" variant="outlineEditorial" />}
    </div>
  </form>;
}

/** Scroll to a form and focus its first field. */
export function focusForm(formId: string) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
  window.setTimeout(() => form.querySelector<HTMLElement>("[data-autofocus]")?.focus({ preventScroll: true }), 450);
}
