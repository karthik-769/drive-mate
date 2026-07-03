import { useState } from "react";
import { Link } from "react-router-dom";
import PageFrame from "../components/PageFrame";
import RideCard from "../components/RideCard";
import { getStoredRides } from "../data";
import { badgeClass, cardClass, sectionShellClass } from "../styles";
import { navigationSets } from "../navigation";

export default function SharedDrivingPage() {
  const [requests, setRequests] = useState({});
  const rides = getStoredRides().filter((ride) => ride.allowSharedDriving);

  return (
    <PageFrame
      subtitle="Shared driving"
      navLinks={navigationSets.shared}
      footerLeft="Shared driving needs explicit owner approval."
      footerRight={<Link className="font-bold text-brandDark" to="/safety">Verification</Link>}
    >
      <section className={sectionShellClass}>
        <div className="mb-6 max-w-3xl">
          <span className="mb-3 inline-block text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brandDark">
            Verified passenger-driver
          </span>
          <h1 className="text-[clamp(2.3rem,6vw,5.4rem)] leading-[0.95] font-bold">
            Share the driving on long trips
          </h1>
          <p className="mt-3 leading-relaxed text-muted">
            Owners can reduce driving stress. Passengers with proper verification can request a lower fare by helping drive.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <article className={cardClass}>
            <span className={`${badgeClass} mb-4 bg-ink text-white`}>ID</span>
            <h3 className="mb-2 text-xl font-bold">License required</h3>
            <p className="leading-relaxed">Driver-passenger must upload license and ID proof before owner approval.</p>
          </article>
          <article className={cardClass}>
            <span className={`${badgeClass} mb-4 bg-ink text-white`}>BG</span>
            <h3 className="mb-2 text-xl font-bold">Background check</h3>
            <p className="leading-relaxed">Only verified profiles should be allowed to drive another person's car.</p>
          </article>
          <article className={cardClass}>
            <span className={`${badgeClass} mb-4 bg-ink text-white`}>OK</span>
            <h3 className="mb-2 text-xl font-bold">Owner decision</h3>
            <p className="leading-relaxed">The car owner reviews profile, experience, route fit, and accepts or rejects manually.</p>
          </article>
        </div>

        <div className="mt-6 grid gap-4">
          {rides.map((ride) => {
            const entry = requests[ride.id] || {};
            return (
              <RideCard
                key={ride.id}
                ride={ride}
                seatRequested={entry.seat}
                driveRequested={entry.drive}
                onSeatRequest={(rideId) =>
                  setRequests((current) => ({
                    ...current,
                    [rideId]: { ...(current[rideId] || {}), seat: true }
                  }))
                }
                onDriveRequest={(rideId) =>
                  setRequests((current) => ({
                    ...current,
                    [rideId]: { ...(current[rideId] || {}), drive: true }
                  }))
                }
              />
            );
          })}
        </div>

        <div className="mt-6 rounded-brand border border-[rgba(23,107,89,0.2)] bg-[rgba(23,107,89,0.1)] p-4 text-green">
          <strong>Important:</strong> DriveMate is only a connecting platform. Damage, accident, misuse, payment, and driving responsibility must be agreed between the owner and driver-passenger before travel.
        </div>
      </section>
    </PageFrame>
  );
}
