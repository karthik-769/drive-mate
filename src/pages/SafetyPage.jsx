import { Link } from "react-router-dom";
import PageFrame from "../components/PageFrame";
import { cardClass, sectionShellClass } from "../styles";
import { navigationSets } from "../navigation";

export default function SafetyPage() {
  return (
    <PageFrame
      subtitle="Safety"
      navLinks={navigationSets.safety}
      footerLeft="Safety first, approval always manual."
      footerRight={<Link className="font-bold text-brandDark" to="/contact">Contact</Link>}
    >
      <section className={`${sectionShellClass} max-w-4xl`}>
        <span className="mb-3 inline-block text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brandDark">
          Verification and safety
        </span>
        <h1 className="text-[clamp(2.3rem,6vw,5.4rem)] leading-[0.95] font-bold">
          Trust checks before travel
        </h1>

        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          <article className={cardClass}>
            <h3 className="mb-2 text-xl font-bold">Owner verification</h3>
            <p className="leading-relaxed">Phone, email, vehicle details, and ID checks should be completed before accepting passengers.</p>
          </article>
          <article className={cardClass}>
            <h3 className="mb-2 text-xl font-bold">Passenger verification</h3>
            <p className="leading-relaxed">Phone, email, ID proof, and emergency contact help owners review ride requests.</p>
          </article>
          <article className={cardClass}>
            <h3 className="mb-2 text-xl font-bold">Shared driver verification</h3>
            <p className="leading-relaxed">License upload, background verification, driving experience, and owner approval are required.</p>
          </article>
          <article className={cardClass}>
            <h3 className="mb-2 text-xl font-bold">Full-trip driver verification</h3>
            <p className="leading-relaxed">Driver profiles show license status, background status, experience, languages, and supported car types.</p>
          </article>
        </div>

        <div className="mt-6 rounded-brand border border-[rgba(23,107,89,0.2)] bg-[rgba(23,107,89,0.1)] p-4 text-green">
          Always confirm documents, payment, route, vehicle condition, food, stay, and responsibility terms before the journey starts.
        </div>
      </section>
    </PageFrame>
  );
}
