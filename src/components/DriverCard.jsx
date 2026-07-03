import { badgeClass, cardClass, secondaryButtonClass } from "../styles";
import { money } from "../data";

export default function DriverCard({
  driver,
  days,
  requested = false,
  onRequest
}) {
  return (
    <article className={cardClass}>
      <div className="mb-3 flex flex-wrap gap-2">
        <span className={`${badgeClass} bg-[rgba(23,107,89,0.12)] text-green`}>
          License verified
        </span>
        <span className={`${badgeClass} bg-[rgba(23,107,89,0.12)] text-green`}>
          Background verified
        </span>
      </div>

      <h3 className="mb-2 text-xl font-bold">{driver.name}</h3>
      <p className="mb-4 text-muted">
        {driver.city} - {driver.experience} years experience - {driver.rating}/5 rating
      </p>

      <div className="mb-4 grid gap-2 sm:grid-cols-2">
        <div className="rounded-brand border border-[rgba(23,22,21,0.08)] bg-white/70 p-3">
          <span className="block text-sm text-muted">Car types</span>
          <strong className="text-[1.05rem]">{driver.carTypes.join(", ")}</strong>
        </div>
        <div className="rounded-brand border border-[rgba(23,22,21,0.08)] bg-white/70 p-3">
          <span className="block text-sm text-muted">Passengers allowed</span>
          <strong className="text-[1.05rem]">Up to {driver.maxPassengers}</strong>
        </div>
        <div className="rounded-brand border border-[rgba(23,22,21,0.08)] bg-white/70 p-3">
          <span className="block text-sm text-muted">Daily charge</span>
          <strong className="text-[1.05rem]">{money(driver.dailyCharge)}</strong>
        </div>
        <div className="rounded-brand border border-[rgba(23,22,21,0.08)] bg-white/70 p-3">
          <span className="block text-sm text-muted">Estimated total</span>
          <strong className="text-[1.05rem]">{money(driver.dailyCharge * days)}</strong>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className={`${badgeClass} bg-[rgba(32,92,143,0.1)] text-blue`}>
          Stay: {driver.stay}
        </span>
        <span className={`${badgeClass} bg-[rgba(32,92,143,0.1)] text-blue`}>
          Food: {driver.food}
        </span>
        <span className={`${badgeClass} bg-[rgba(32,92,143,0.1)] text-blue`}>
          {driver.languages}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onRequest?.(driver.name)}
        disabled={requested}
        className={secondaryButtonClass}
      >
        {requested ? `Request sent to ${driver.name}` : "Request driver"}
      </button>
    </article>
  );
}
