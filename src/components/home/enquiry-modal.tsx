"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type EnquiryForm = {
  name: string;
  phone: string;
  email: string;
  interestedIn: string;
  location: string;
  budget: string;
  message: string;
};

const initialForm: EnquiryForm = {
  name: "",
  phone: "",
  email: "",
  interestedIn: "Buying a Property",
  location: "Noida",
  budget: "Below ₹50 Lakh",
  message: "",
};

const inputClass = "h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function EnquiryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<EnquiryForm>(initialForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, isSubmitting, onClose]);

  if (!open) return null;

  const updateField = (field: keyof EnquiryForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.phone.trim()) {
      setError("Please enter your full name and mobile number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Unable to submit your enquiry.");
      setSubmitted(true);
      setForm(initialForm);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to submit your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !isSubmitting) onClose(); }}>
      <div role="dialog" aria-modal="true" aria-labelledby="enquiry-title" className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background p-5 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">YouWe Homes</p>
            <h2 id="enquiry-title" className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Tell us what you are looking for</h2>
            <p className="mt-2 text-sm text-muted-foreground">A property advisor will help you find the right option.</p>
          </div>
          <Button type="button" variant="ghost" size="icon" aria-label="Close enquiry form" onClick={onClose} disabled={isSubmitting}><X /></Button>
        </div>

        {submitted ? (
          <div className="mt-8 rounded-xl border border-primary/20 bg-primary/10 p-6 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
            <p className="mt-4 font-semibold text-foreground">Thank you. Our property advisor will contact you shortly.</p>
            <Button type="button" className="mt-5" onClick={onClose}>Close</Button>
          </div>
        ) : (
          <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-medium text-foreground">Full Name *<input className={inputClass} value={form.name} onChange={(event) => updateField("name", event.target.value)} required autoComplete="name" /></label>
            <label className="grid gap-2 text-sm font-medium text-foreground">Mobile Number *<input className={inputClass} value={form.phone} onChange={(event) => updateField("phone", event.target.value)} required inputMode="tel" autoComplete="tel" /></label>
            <label className="grid gap-2 text-sm font-medium text-foreground">Email Address<input className={inputClass} type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} autoComplete="email" /></label>
            <label className="grid gap-2 text-sm font-medium text-foreground">Interested In<select className={inputClass} value={form.interestedIn} onChange={(event) => updateField("interestedIn", event.target.value)}><option>Buying a Property</option><option>Investment</option><option>Home Loan</option><option>Site Visit</option><option>Other</option></select></label>
            <label className="grid gap-2 text-sm font-medium text-foreground">Preferred Location<select className={inputClass} value={form.location} onChange={(event) => updateField("location", event.target.value)}><option>Noida</option><option>Greater Noida</option><option>Gurgaon</option><option>Delhi NCR</option><option>Other</option></select></label>
            <label className="grid gap-2 text-sm font-medium text-foreground">Budget<select className={inputClass} value={form.budget} onChange={(event) => updateField("budget", event.target.value)}><option>Below ₹50 Lakh</option><option>₹50 Lakh–₹1 Cr</option><option>₹1–2 Cr</option><option>₹2 Cr+</option></select></label>
            <label className="grid gap-2 text-sm font-medium text-foreground sm:col-span-2">Message / Requirement<textarea className={`${inputClass} h-24 resize-y py-3`} value={form.message} onChange={(event) => updateField("message", event.target.value)} /></label>
            {error ? <p className="sm:col-span-2 text-sm text-destructive" role="alert">{error}</p> : null}
            <div className="flex justify-end sm:col-span-2"><Button type="submit" className="min-w-36" disabled={isSubmitting}>{isSubmitting ? <><Loader2 className="animate-spin" />Submitting...</> : "Submit Enquiry"}</Button></div>
          </form>
        )}
      </div>
    </div>
  );
}