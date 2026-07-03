import { badgeClass, cardClass, secondaryButtonClass } from "../styles";
import { money } from "../data";

export default function RideCard({
  ride,
  compact = false,
  seatRequested = false,
  driveRequested = false,
  onSeatRequest,
  onDriveRequest
}) {
  return (
    <article className={cardClass}>
      <div className="mb-3 flex flex-wrap gap-2">
        <span className={`${badgeClass} bg-[rgba(23,107,89,0.12)] text-green`}>
          {ride.carType}
        </span>
        <span className={`${badgeClass} bg-[rgba(32,92,143,0.1)] text-blue`}>
          {ride.passengers} passengers allowed
        </span>
        <span className={`${badgeClass} bg-[rgba(212,154,57,0.18)] text-[#7a4d09]`}>
          {ride.openSeats} seats open
        </span>
      </div>

      <h3 className="mb-2 text-xl font-bold">
        {ride.from} to {ride.to}
      </h3>
      <p className="mb-4 text-muted">
        {ride.date} at {ride.time} - {ride.carModel} - Owner: {ride.owner}
      </p>

      <div className="mb-4 grid gap-2 sm:grid-cols-2">
        <div className="rounded-brand border border-[rgba(23,22,21,0.08)] bg-white/70 p-3">
          <span className="block text-sm text-muted">Passenger fare</span>
          <strong className="text-[1.15rem]">{money(ride.fare)}</strong>
        </div>
        <div className="rounded-brand border border-[rgba(23,22,21,0.08)] bg-white/70 p-3">
          <span className="block text-sm text-muted">Shared-driving fare</span>
          <strong className="text-[1.15rem]">
            {ride.allowSharedDriving ? money(ride.driveFare) : "Not allowed"}
          </strong>
        </div>
      </div>

      <p className="mb-4 leading-relaxed">{ride.notes}</p>

      {!compact ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onSeatRequest?.(ride.id)}
            className={secondaryButtonClass}
          >
            {seatRequested ? "Seat request sent" : "Request seat"}
          </button>
          <button
            type="button"
            onClick={() => onDriveRequest?.(ride.id)}
            disabled={!ride.allowSharedDriving || driveRequested}
            className={secondaryButtonClass}
          >
            {driveRequested ? "Shared-driving request sent" : "Request to drive"}
          </button>
        </div>
      ) : null}
    </article>
  );
}
