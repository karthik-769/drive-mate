import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageFrame from "../components/PageFrame";
import RideCard from "../components/RideCard";
import { getStoredRides } from "../data";
import { badgeClass, cardClass, inputClass, primaryButtonClass, sectionShellClass } from "../styles";
import { navigationSets } from "../navigation";

function FeatureLink({ to, number, title, description }) {
  return (
    <Link to={to} className={`${cardClass} block`}>
      <span className={`${badgeClass} mb-4 bg-ink text-white`}>{number}</span>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="leading-relaxed">{description}</p>
    </Link>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ from: "", to: "", date: "" });
  const featuredRides = getStoredRides().slice(0, 3);

  function handleSubmit(event) {
    event.preventDefault();
    const params = new URLSearchParams(search);
    navigate(`/passenger?${params.toString()}`);
  }

  return (
    <PageFrame
      subtitle="Share rides. Share driving."
      navLinks={navigationSets.home}
      footerLeft="DriveMate prototype"
      footerRight={<Link className="font-bold text-brandDark" to="/contact">Contact support</Link>}
    >
      <section
        className="mt-6 min-h-[580px] rounded-brand bg-cover bg-center p-5 text-white shadow-soft sm:p-11"
        style={{
          backgroundImage:
            "linear-gradient(rgba(18, 16, 14, 0.18), rgba(18, 16, 14, 0.74)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80')"
        }}
      >
        <div className="max-w-3xl">
          <span className="mb-3 inline-block text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#ffd6a8]">
            Intercity travel made lighter
          </span>
          <h1 className="mb-4 text-[clamp(2.3rem,6vw,5.4rem)] leading-[0.95] font-bold">
            Book seats, share costs, or let a verified passenger help drive.
          </h1>
          <p className="max-w-[680px] text-[1.1rem] leading-[1.65]">
            DriveMate connects car owners, passengers, shared-driving travelers, and full-trip drivers in one simple platform.
            Payments and final terms stay directly between users in this early version.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid gap-3 rounded-brand border border-white/30 bg-white/15 p-3 backdrop-blur-sm lg:grid-cols-[1fr_1fr_1fr_auto]"
          >
            <input
              className={inputClass}
              name="from"
              placeholder="From city"
              required
              value={search.from}
              onChange={(event) => setSearch((current) => ({ ...current, from: event.target.value }))}
            />
            <input
              className={inputClass}
              name="to"
              placeholder="To city"
              required
              value={search.to}
              onChange={(event) => setSearch((current) => ({ ...current, to: event.target.value }))}
            />
            <input
              className={inputClass}
              name="date"
              type="date"
              required
              value={search.date}
              onChange={(event) => setSearch((current) => ({ ...current, date: event.target.value }))}
            />
            <button type="submit" className={primaryButtonClass}>
              Find rides
            </button>
          </form>
        </div>
      </section>

      <section className={`${sectionShellClass} mt-6`}>
        <div className="mb-6 max-w-3xl">
          <span className="mb-3 inline-block text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brandDark">
            Choose what you need
          </span>
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold">One platform, three travel modes</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-4">
          <FeatureLink
            to="/passenger"
            number="01"
            title="Find a ride"
            description="Search owner-posted trips and request a passenger seat to split travel cost."
          />
          <FeatureLink
            to="/owner"
            number="02"
            title="Offer your car trip"
            description="Post your route, seat count, fare, car type, and whether shared driving is allowed."
          />
          <FeatureLink
            to="/shared-driving"
            number="03"
            title="Share the driving"
            description="Verified passengers with license and background checks can request to drive part of the journey."
          />
          <FeatureLink
            to="/hire-driver"
            number="04"
            title="Hire a trip driver"
            description="Book a verified driver by car type, passenger capacity, daily charge, stay, and food terms."
          />
        </div>
      </section>

      <section className={`${sectionShellClass} mt-6 grid gap-5 lg:grid-cols-[0.78fr_1.22fr]`}>
        <div>
          <span className="mb-3 inline-block text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brandDark">
            Live demo rides
          </span>
          <h2 className="mb-3 text-[clamp(1.5rem,3vw,2.5rem)] font-bold">Popular open routes</h2>
          <p className="text-muted">
            These are sample rides rendered from JavaScript data. You can filter them on the passenger page.
          </p>
        </div>

        <div className="grid gap-4">
          {featuredRides.map((ride) => (
            <RideCard key={ride.id} ride={ride} compact />
          ))}
        </div>
      </section>
    </PageFrame>
  );
}
