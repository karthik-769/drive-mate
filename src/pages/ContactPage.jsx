import { useState } from "react";
import { Link } from "react-router-dom";
import PageFrame from "../components/PageFrame";
import { inputClass, primaryButtonClass, sectionShellClass, textareaClass } from "../styles";
import { navigationSets } from "../navigation";

const initialForm = {
  name: "",
  email: "",
  topic: "Passenger booking",
  message: ""
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("Message saved for demo. In production this would go to support.");
    setForm(initialForm);
  }

  return (
    <PageFrame
      subtitle="Support"
      navLinks={navigationSets.contact}
      footerLeft="For emergencies, contact local authorities first."
      footerRight={<Link className="font-bold text-brandDark" to="/safety">Safety</Link>}
    >
      <section className={`${sectionShellClass} max-w-3xl`}>
        <span className="mb-3 inline-block text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brandDark">
          Support
        </span>
        <h1 className="text-[clamp(2.3rem,6vw,5.4rem)] leading-[0.95] font-bold">
          Contact DriveMate
        </h1>
        <form onSubmit={handleSubmit} className="mt-5 grid gap-3 rounded-brand border border-line bg-white/68 p-5">
          <input
            className={inputClass}
            name="name"
            placeholder="Your name"
            required
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          />
          <input
            className={inputClass}
            name="email"
            type="email"
            placeholder="Email address"
            required
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          />
          <select
            className={inputClass}
            name="topic"
            value={form.topic}
            onChange={(event) => setForm((current) => ({ ...current, topic: event.target.value }))}
          >
            <option>Passenger booking</option>
            <option>Car owner trip</option>
            <option>Shared driving</option>
            <option>Hire driver</option>
            <option>Safety issue</option>
          </select>
          <textarea
            className={textareaClass}
            name="message"
            placeholder="Tell us what happened"
            required
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          />
          <button type="submit" className={primaryButtonClass}>
            Send message
          </button>
          {message ? (
            <p className="rounded-brand border border-[rgba(23,107,89,0.2)] bg-[rgba(23,107,89,0.1)] px-4 py-3 text-green">
              {message}
            </p>
          ) : null}
        </form>
      </section>
    </PageFrame>
  );
}
