import { useState } from "react";
import { Link } from "react-router-dom";
import PageFrame from "../components/PageFrame";
import { sampleRequests, saveRide } from "../data";
import { inputClass, primaryButtonClass, sectionShellClass, textareaClass } from "../styles";
import { navigationSets } from "../navigation";

const initialForm = {
  from: "",
  to: "",
  date: "",
  time: "",
  carModel: "",
  carType: "Sedan",
  passengers: "4",
  fare: "1500",
  driveFare: "1000",
  allowSharedDriving: true,
  notes: ""
};

export default function OwnerPage() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [requests, setRequests] = useState(sampleRequests);

  function handleSubmit(event) {
    event.preventDefault();
    saveRide({
      id: `ride-${Date.now()}`,
      from: form.from,
      to: form.to,
      date: form.date,
      time: form.time,
      owner: "You",
      carModel: form.carModel,
      carType: form.carType,
      passengers: Number(form.passengers),
      openSeats: Number(form.passengers),
      fare: Number(form.fare),
      driveFare: Number(form.driveFare),
      allowSharedDriving: form.allowSharedDriving,
      notes: form.notes
    });
    setForm(initialForm);
    setMessage("Trip posted. Open Passenger page to see it in the marketplace.");
  }

  return (
    <PageFrame
      subtitle="Owner dashboard"
      navLinks={navigationSets.owner}
      footerLeft="Owner approves passengers manually."
      footerRight={<Link className="font-bold text-brandDark" to="/safety">Safety rules</Link>}
    >
      <section className={sectionShellClass}>
        <div className="mb-6 max-w-3xl">
          <span className="mb-3 inline-block text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brandDark">
            Car owner tools
          </span>
          <h1 className="text-[clamp(2.3rem,6vw,5.4rem)] leading-[0.95] font-bold">
            Post a trip and manage passenger requests
          </h1>
          <p className="mt-3 leading-relaxed text-muted">
            Add route, fares, car type, passenger capacity, and whether another verified traveler can drive.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.8fr_1fr]">
          <form onSubmit={handleSubmit} className="grid gap-3 rounded-brand border border-line bg-white/68 p-5">
            <h2 className="text-2xl font-bold">Post trip</h2>
            <input
              className={inputClass}
              name="from"
              placeholder="From city"
              required
              value={form.from}
              onChange={(event) => setForm((current) => ({ ...current, from: event.target.value }))}
            />
            <input
              className={inputClass}
              name="to"
              placeholder="To city"
              required
              value={form.to}
              onChange={(event) => setForm((current) => ({ ...current, to: event.target.value }))}
            />
            <input
              className={inputClass}
              name="date"
              type="date"
              required
              value={form.date}
              onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
            />
            <input
              className={inputClass}
              name="time"
              type="time"
              required
              value={form.time}
              onChange={(event) => setForm((current) => ({ ...current, time: event.target.value }))}
            />
            <input
              className={inputClass}
              name="carModel"
              placeholder="Car model, e.g. Hyundai Creta"
              required
              value={form.carModel}
              onChange={(event) => setForm((current) => ({ ...current, carModel: event.target.value }))}
            />
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
            <input
              className={inputClass}
              name="fare"
              type="number"
              min="0"
              required
              value={form.fare}
              onChange={(event) => setForm((current) => ({ ...current, fare: event.target.value }))}
            />
            <input
              className={inputClass}
              name="driveFare"
              type="number"
              min="0"
              required
              value={form.driveFare}
              onChange={(event) => setForm((current) => ({ ...current, driveFare: event.target.value }))}
            />
            <label className="flex items-center gap-2 text-muted">
              <input
                type="checkbox"
                checked={form.allowSharedDriving}
                onChange={(event) =>
                  setForm((current) => ({ ...current, allowSharedDriving: event.target.checked }))
                }
              />
              Allow shared driving
            </label>
            <textarea
              className={textareaClass}
              name="notes"
              placeholder="Owner notes, pickup point, luggage, driving preference"
              required
              value={form.notes}
              onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
            />
            <button type="submit" className={primaryButtonClass}>
              Post trip
            </button>
            {message ? (
              <p className="rounded-brand border border-[rgba(23,107,89,0.2)] bg-[rgba(23,107,89,0.1)] px-4 py-3 text-green">
                {message}
              </p>
            ) : null}
          </form>

          <section className="rounded-brand border border-line bg-white/68 p-5">
            <h2 className="mb-4 text-2xl font-bold">Incoming requests</h2>
            <div className="grid gap-4">
              {requests.map((request, index) => {
                const statusStyle =
                  request.status === "Approved"
                    ? "bg-[rgba(23,107,89,0.12)] text-green"
                    : request.status === "Rejected"
                    ? "bg-[rgba(204,76,47,0.12)] text-brandDark"
                    : "bg-[rgba(212,154,57,0.18)] text-[#7a4d09]";

                return (
                  <article key={`${request.name}-${request.route}`} className="rounded-brand border border-line bg-white/70 p-4">
                    <h3 className="text-xl font-bold">{request.name}</h3>
                    <p className="mt-1 text-muted">
                      {request.route} - {request.type}
                    </p>
                    <p className="mt-3 leading-relaxed">{request.message}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className={`inline-flex min-h-[30px] items-center rounded-brand px-2.5 py-1 text-sm font-bold ${statusStyle}`}>
                        {request.status}
                      </span>
                      <button
                        type="button"
                        className="rounded-brand border border-[rgba(23,107,89,0.18)] bg-[rgba(23,107,89,0.12)] px-4 py-2.5 font-bold text-green"
                        onClick={() =>
                          setRequests((current) =>
                            current.map((entry, currentIndex) =>
                              currentIndex === index ? { ...entry, status: "Approved" } : entry
                            )
                          )
                        }
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="rounded-brand border border-[rgba(23,107,89,0.18)] bg-[rgba(23,107,89,0.12)] px-4 py-2.5 font-bold text-green"
                        onClick={() =>
                          setRequests((current) =>
                            current.map((entry, currentIndex) =>
                              currentIndex === index ? { ...entry, status: "Rejected" } : entry
                            )
                          )
                        }
                      >
                        Reject
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </PageFrame>
  );
}
