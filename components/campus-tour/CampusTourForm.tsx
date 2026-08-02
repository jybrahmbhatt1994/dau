// DESTINATION: components/campus-tour/CampusTourForm.tsx
"use client";

import { useState } from "react";
import type { CampusTourFormOptions } from "@/lib/types";

interface FormState {
  name: string; email: string; studentEmail: string; mobileNumber: string;
  studentContactNumber: string; state: string; city: string; schoolName: string;
  currentClass: string; preferredStream: string; tourDate: string; yearToJoin: string;
  accompaniedCount: string; offerLetter: string; modeOfTransport: string;
  captchaAnswer: string; agree: boolean;
}

const initialState: FormState = {
  name: "", email: "", studentEmail: "", mobileNumber: "", studentContactNumber: "",
  state: "", city: "", schoolName: "", currentClass: "", preferredStream: "",
  tourDate: "", yearToJoin: "", accompaniedCount: "", offerLetter: "", modeOfTransport: "",
  captchaAnswer: "", agree: false,
};

const inputClass =
  "w-full rounded-sm border border-transparent bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/60 outline-none focus:border-gold focus:ring-2 focus:ring-gold/60";
const selectClass = inputClass + " appearance-none";

export function CampusTourForm({ options }: { options: CampusTourFormOptions }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [cities, setCities] = useState<string[]>([]);
  const [captcha, setCaptcha] = useState(options.captcha);
  const [captchaToken, setCaptchaToken] = useState(options.captcha.token);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [thankYouMessage, setThankYouMessage] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleStateChange(stateName: string) {
    update("state", stateName);
    update("city", "");
    setCities(options.states.find((s) => s.state === stateName)?.cities ?? []);
  }

  async function refreshCaptcha() {
    try {
      const res = await fetch("/api/campus-tour/captcha", { cache: "no-store" });
      const data = await res.json();
      setCaptcha(data);
      setCaptchaToken(data.token);
      update("captchaAnswer", "");
    } catch {
      /* user can retry submit manually */
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/campus-tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, captchaToken }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
        if (data.error === "captcha") await refreshCaptcha();
        return;
      }

      setThankYouMessage(data.message);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm bg-white/10 px-6 py-12 text-center">
        <p className="font-display text-xl font-semibold text-white lg:text-2xl">
          {thankYouMessage}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <input required type="text" placeholder="Enter Name *" className={inputClass}
        value={form.name} onChange={(e) => update("name", e.target.value)} />

      <input required type="email" placeholder="Enter Email Address *" className={inputClass}
        value={form.email} onChange={(e) => update("email", e.target.value)} />

      <input required type="email" placeholder="Enter Student Email ID *" className={inputClass}
        value={form.studentEmail} onChange={(e) => update("studentEmail", e.target.value)} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex overflow-hidden rounded-sm bg-white">
          <span className="flex items-center border-r border-navy/10 px-3 text-sm text-navy/70">+91</span>
          <input required type="tel" placeholder="Enter Mobile Number *"
            className="w-full px-4 py-3 text-sm text-navy placeholder:text-navy/60 outline-none"
            value={form.mobileNumber} onChange={(e) => update("mobileNumber", e.target.value)} />
        </div>
        <input required type="tel" placeholder="Enter Student Contact Number *" className={inputClass}
          value={form.studentContactNumber} onChange={(e) => update("studentContactNumber", e.target.value)} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <select required className={selectClass} value={form.state}
          onChange={(e) => handleStateChange(e.target.value)}>
          <option value="">Select State *</option>
          {options.states.map((s) => <option key={s.state} value={s.state}>{s.state}</option>)}
        </select>
        <select required className={selectClass} value={form.city} disabled={!form.state}
          onChange={(e) => update("city", e.target.value)}>
          <option value="">Select City *</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <input required type="text" placeholder="Enter School Name *" className={inputClass}
        value={form.schoolName} onChange={(e) => update("schoolName", e.target.value)} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <select required className={selectClass} value={form.currentClass}
          onChange={(e) => update("currentClass", e.target.value)}>
          <option value="">Select Current Class *</option>
          {options.currentClass.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select required className={selectClass} value={form.preferredStream}
          onChange={(e) => update("preferredStream", e.target.value)}>
          <option value="">Select Preferred Stream *</option>
          {options.preferredStream.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <select required className={selectClass} value={form.tourDate}
        onChange={(e) => update("tourDate", e.target.value)}>
        <option value="">Select Date of Campus Tour *</option>
        {options.tourDates.map((d) => <option key={d} value={d}>{d}</option>)}
      </select>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <select required className={selectClass} value={form.yearToJoin}
          onChange={(e) => update("yearToJoin", e.target.value)}>
          <option value="">Select Year to Join DAU *</option>
          {options.yearToJoin.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <select required className={selectClass} value={form.accompaniedCount}
          onChange={(e) => update("accompaniedCount", e.target.value)}>
          <option value="">Select Accompanied by How Many People *</option>
          {options.accompaniedCount.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <select required className={selectClass} value={form.offerLetter}
          onChange={(e) => update("offerLetter", e.target.value)}>
          <option value="">Select Have you already received an offer letter *</option>
          {options.offerLetterOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <select required className={selectClass} value={form.modeOfTransport}
          onChange={(e) => update("modeOfTransport", e.target.value)}>
          <option value="">Select Mode of Transport *</option>
          {options.modeOfTransport.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center rounded-sm bg-white px-4 py-3">
          <span className="font-display text-sm font-semibold text-navy">{captcha.question} = ?</span>
        </div>
        <input required type="text" inputMode="numeric" placeholder="Enter Captcha Answer *" className={inputClass}
          value={form.captchaAnswer} onChange={(e) => update("captchaAnswer", e.target.value)} />
      </div>

      <label className="flex items-start gap-3 text-sm text-white/90">
        <input required type="checkbox" className="mt-1 h-4 w-4 accent-gold"
          checked={form.agree} onChange={(e) => update("agree", e.target.checked)} />
        I agree to receive information about DAU University. *
      </label>

      {status === "error" && <p className="text-sm font-medium text-red-300">{errorMessage}</p>}

      <button type="submit" disabled={status === "loading"}
        className="w-full bg-brand py-4 font-display text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60">
        {status === "loading" ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}