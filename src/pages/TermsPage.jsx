import { Link } from "react-router-dom";
import PageFrame from "../components/PageFrame";
import { sectionShellClass } from "../styles";
import { navigationSets } from "../navigation";

export default function TermsPage() {
  return (
    <PageFrame
      subtitle="Terms"
      navLinks={navigationSets.terms}
      footerLeft="Use this text as prototype copy, not legal advice."
      footerRight={<Link className="font-bold text-brandDark" to="/contact">Support</Link>}
    >
      <section className={`${sectionShellClass} max-w-3xl`}>
        <span className="mb-3 inline-block text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brandDark">
          Important disclaimer
        </span>
        <h1 className="text-[clamp(2.3rem,6vw,5.4rem)] leading-[0.95] font-bold">
          Platform terms for the prototype
        </h1>
        <div className="mt-5 grid gap-4 leading-relaxed text-muted">
          <p>DriveMate is a connecting service only. It helps users discover rides, shared-driving opportunities, and full-trip drivers.</p>
          <p>In the early stage, payments, fares, advance amounts, refunds, food, stay, fuel, tolls, and daily charges are handled directly between users.</p>
          <p>DriveMate is not responsible for vehicle damage, accidents, misuse, traffic violations, payment disputes, personal disputes, or losses that happen during user-arranged travel or driving.</p>
          <p>Shared driving is allowed only when the car owner approves a properly verified passenger-driver with valid license and background details.</p>
          <p>Full-trip driver bookings must include clear agreement on car type, number of passengers allowed, route, dates, food, stay, daily charge, extra allowance, and responsibility for damage.</p>
          <p>Final responsibility belongs to the participating users. Always verify identity, license, vehicle condition, and emergency contact before starting a trip.</p>
        </div>
      </section>
    </PageFrame>
  );
}
