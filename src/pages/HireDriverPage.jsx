import { useState } from "react";
import { Link } from "react-router-dom";
import PageFrame from "../components/PageFrame";
import DriverCard from "../components/DriverCard";
import { drivers } from "../data";
import { inputClass, primaryButtonClass, sectionShellClass, textareaClass } from "../styles";
import { navigationSets } from "../navigation";

const initialForm = {
  route: "",
  startDate: "",
  endDate: "",
  carType: "Sedan",
  passengers: "4",
  days: "2",
  stay: "owner",
  food: "owner",
  instructions: ""
};

export default function HireDriverPage() {
  const [form, setForm] = useState(initialForm);
  const [applied, setApplied] = useState(initialForm);
  const [requests, setRequests] = useState({});

  const matchedDrivers = drivers.filter(
    (driver) =>
      driver.carTypes.includes(applied.carType) &&
      driver.maxPassengers >= Number(applied.passengers || 4)
  );

  const summary = `Showing drivers for ${applied.carType} with up to ${applied.passengers} passengers. Estimated charges use ${applied.days} day(s).`;

  return (
    <PageFrame
      subtitle="Full-trip drivers"
      navLinks={navigationSets.hire}
      footerLeft="Daily charges are sample values for demo."
      footerRight={<Link className="font-bold text-brandDark" to="/contact">Need help?</Link>}
    >
      <section className={sectionShellClass}>
        <div className="mb-6 max-w-3xl">
          <span className="mb-3 inline-block text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brandDark">
            Driver for full trip
          </span>
          <h1 className="text-[clamp(2.3rem,6vw,5.4rem)] leading-[0.95] font-bold">
            Hire a verified driver by car type and passenger count
          </h1>
          <p className="mt-3 leading-relaxed text-muted">
            Select what type of car you have, how many passengers are allowed, number of days, stay, food, and daily charges.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.8fr_1fr]">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setApplied(form);
            }}
            className="grid gap-3 rounded-brand border border-line bg-white/68 p-5"
          >
            <h2 className="text-2xl font-bold">Trip requirements</h2>
            <label className="grid gap-2">
              <span className="font-bold text-muted">Trip route</span>
              <input
                className={inputClass}
                name="route"
                placeholder="Example: Bengaluru to Goa"
                required
                value={form.route}
                onChange={(event) => setForm((current) => ({ ...current, route: event.target.value }))}
              />
            </label>
            <label className="grid gap-2">
              <span className="font-bold text-muted">Start date</span>
              <input
                className={inputClass}
                name="startDate"
                type="date"
                required
                value={form.startDate}
                onChange={(event) => setForm((current) => ({ ...current, startDate: event.target.value }))}
              />
            </label>
            <label className="grid gap-2">
              <span className="font-bold text-muted">End date</span>
              <input
                className={inputClass}
                name="endDate"
                type="date"
                required
                value={form.endDate}
                onChange={(event) => setForm((current) => ({ ...current, endDate: event.target.value }))}
              />
            </label>
            <label className="grid gap-2">
              <span className="font-bold text-muted">Type of car</span>
              <select
                className={inputClass}
                name="carType"
                required
                value={form.carType}
                onChange={(event) => setForm((current) => ({ ...current, carType: event.target.value }))}
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="MPV">MPV</option>
                <option value="Luxury">Luxury</option>
              </select>
            </label>
            <label className="grid gap-2">
              <span className="font-bold text-muted">Passengers allowed</span>
              <input
                className={inputClass}
                name="passengers"
                type="number"
                min="1"
                max="8"
                required
                value={form.passengers}
                onChange={(event) => setForm((current) => ({ ...current, passengers: event.target.value }))}
              />
            </label>
            <label className="grid gap-2">
              <span className="font-bold text-muted">Number of trip days</span>
              <input
                className={inputClass}
                name="days"
                type="number"
                min="1"
                max="30"
                required
                value={form.days}
                onChange={(event) => setForm((current) => ({ ...current, days: event.target.value }))}
              />
            </label>
            <label className="grid gap-2">
              <span className="font-bold text-muted">Driver stay arrangement</span>
              <select
                className={inputClass}
                name="stay"
                value={form.stay}
                onChange={(event) => setForm((current) => ({ ...current, stay: event.target.value }))}
              >
                <option value="owner">Stay included by owner</option>
                <option value="driver">Driver arranges stay</option>
                <option value="none">Stay not needed</option>
              </select>
            </label>
            <label className="grid gap-2">
              <span className="font-bold text-muted">Driver food arrangement</span>
              <select
                className={inputClass}
                name="food"
                value={form.food}
                onChange={(event) => setForm((current) => ({ ...current, food: event.target.value }))}
              >
                <option value="owner">Food included by owner</option>
                <option value="driver">Driver handles food</option>
                <option value="none">Food not included</option>
              </select>
            </label>
            <label className="grid gap-2">
              <span className="font-bold text-muted">Special instructions</span>
              <textarea
                className={textareaClass}
                name="instructions"
                placeholder="Pickup, timing, luggage, family trip details"
                value={form.instructions}
                onChange={(event) => setForm((current) => ({ ...current, instructions: event.target.value }))}
              />
            </label>
            <button type="submit" className={primaryButtonClass}>
              Find matching drivers
            </button>
            <p className="rounded-brand border border-[rgba(23,107,89,0.2)] bg-[rgba(23,107,89,0.1)] px-4 py-3 text-green">
              {summary}
            </p>
          </form>

          <section className="rounded-brand border border-line bg-white/68 p-5">
            <h2 className="mb-3 text-2xl font-bold">Driver responsibility note</h2>
            <p className="text-muted">
              The driver is verified in the prototype with license and background badges. Final fare, food, stay, vehicle damage, accident, and misuse responsibility are agreed directly between user and driver.
            </p>
            <Link
              to="/terms"
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-brand border border-[rgba(23,107,89,0.18)] bg-[rgba(23,107,89,0.12)] px-4 py-2.5 font-bold text-green"
            >
              Read disclaimer
            </Link>
          </section>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {matchedDrivers.map((driver) => (
            <DriverCard
              key={driver.name}
              driver={driver}
              days={Number(applied.days || 1)}
              requested={Boolean(requests[driver.name])}
              onRequest={(name) => setRequests((current) => ({ ...current, [name]: true }))}
            />
          ))}
        </div>

        {!matchedDrivers.length ? (
          <p className="mt-4 rounded-brand border border-dashed border-line bg-transparent px-4 py-3 text-center text-muted">
            No drivers match this car type and passenger count.
          </p>
        ) : null}
      </section>
    </PageFrame>
  );
}
