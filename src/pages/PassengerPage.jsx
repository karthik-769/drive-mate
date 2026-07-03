import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageFrame from "../components/PageFrame";
import RideCard from "../components/RideCard";
import { getStoredRides } from "../data";
import { inputClass, primaryButtonClass, sectionShellClass } from "../styles";
import { navigationSets } from "../navigation";

export default function PassengerPage() {
  const [searchParams] = useSearchParams();
  const initialFilters = {
    from: searchParams.get("from") || "",
    to: searchParams.get("to") || "",
    date: searchParams.get("date") || "",
    mode: searchParams.get("mode") || ""
  };
  const [filters, setFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [requests, setRequests] = useState({});

  useEffect(() => {
    setFilters(initialFilters);
    setActiveFilters(initialFilters);
  }, [searchParams.toString()]);

  const rides = getStoredRides().filter((ride) => {
    const fromOk = activeFilters.from
      ? ride.from.toLowerCase().includes(activeFilters.from.toLowerCase())
      : true;
    const toOk = activeFilters.to
      ? ride.to.toLowerCase().includes(activeFilters.to.toLowerCase())
      : true;
    const dateOk = activeFilters.date ? ride.date === activeFilters.date : true;
    const modeOk = activeFilters.mode === "drive" ? ride.allowSharedDriving : true;
    return fromOk && toOk && dateOk && modeOk;
  });

  function handleSubmit(event) {
    event.preventDefault();
    setActiveFilters(filters);
  }

  function handleRequest(rideId, kind) {
    setRequests((current) => ({
      ...current,
      [rideId]: {
        ...(current[rideId] || {}),
        [kind]: true
      }
    }));
  }

  return (
    <PageFrame
      subtitle="Passenger booking"
      navLinks={navigationSets.passenger}
      footerLeft="Payments are handled directly between users."
      footerRight={<Link className="font-bold text-brandDark" to="/terms">Read terms</Link>}
    >
      <section className={sectionShellClass}>
        <div className="mb-6 max-w-3xl">
          <span className="mb-3 inline-block text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brandDark">
            Passenger marketplace
          </span>
          <h1 className="text-[clamp(2.3rem,6vw,5.4rem)] leading-[0.95] font-bold">
            Find a seat or request to drive
          </h1>
          <p className="mt-3 leading-relaxed text-muted">
            Filter available routes, compare normal passenger fare and shared-driving fare, then send a request.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-3 rounded-brand border border-line bg-white/55 p-3 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]"
        >
          <input
            className={inputClass}
            name="from"
            placeholder="From city"
            value={filters.from}
            onChange={(event) => setFilters((current) => ({ ...current, from: event.target.value }))}
          />
          <input
            className={inputClass}
            name="to"
            placeholder="To city"
            value={filters.to}
            onChange={(event) => setFilters((current) => ({ ...current, to: event.target.value }))}
          />
          <input
            className={inputClass}
            name="date"
            type="date"
            value={filters.date}
            onChange={(event) => setFilters((current) => ({ ...current, date: event.target.value }))}
          />
          <select
            className={inputClass}
            name="mode"
            value={filters.mode}
            onChange={(event) => setFilters((current) => ({ ...current, mode: event.target.value }))}
          >
            <option value="">Any mode</option>
            <option value="seat">Passenger seat</option>
            <option value="drive">Shared driving</option>
          </select>
          <button type="submit" className={primaryButtonClass}>
            Search
          </button>
        </form>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {rides.map((ride) => {
            const entry = requests[ride.id] || {};
            return (
              <RideCard
                key={ride.id}
                ride={ride}
                seatRequested={entry.seat}
                driveRequested={entry.drive}
                onSeatRequest={(rideId) => handleRequest(rideId, "seat")}
                onDriveRequest={(rideId) => handleRequest(rideId, "drive")}
              />
            );
          })}
        </div>

        {!rides.length ? (
          <p className="mt-4 rounded-brand border border-dashed border-line bg-transparent px-4 py-3 text-center text-muted">
            No rides found. Try another route or date.
          </p>
        ) : null}
      </section>
    </PageFrame>
  );
}
