const storageKey = "drivemate-rides";

export const baseRides = [
  {
    id: "ride-1",
    from: "Bengaluru",
    to: "Chennai",
    date: "2026-06-12",
    time: "06:30",
    owner: "Aarav Menon",
    carModel: "Honda City",
    carType: "Sedan",
    passengers: 4,
    openSeats: 2,
    fare: 1900,
    driveFare: 1250,
    allowSharedDriving: true,
    notes: "Early morning highway trip. Owner wants help driving after city exit."
  },
  {
    id: "ride-2",
    from: "Pune",
    to: "Mumbai",
    date: "2026-06-15",
    time: "09:00",
    owner: "Meera Patil",
    carModel: "Hyundai Creta",
    carType: "SUV",
    passengers: 5,
    openSeats: 3,
    fare: 1200,
    driveFare: 850,
    allowSharedDriving: true,
    notes: "SUV with luggage space. Shared driving allowed for verified passenger."
  },
  {
    id: "ride-3",
    from: "Hyderabad",
    to: "Vijayawada",
    date: "2026-06-18",
    time: "12:00",
    owner: "Nikhil Reddy",
    carModel: "Maruti Baleno",
    carType: "Hatchback",
    passengers: 4,
    openSeats: 2,
    fare: 1500,
    driveFare: 980,
    allowSharedDriving: false,
    notes: "Comfortable daytime ride. Passenger seats only for this trip."
  }
];

export const drivers = [
  {
    name: "Rohan Shetty",
    city: "Bengaluru",
    experience: 8,
    rating: 4.8,
    dailyCharge: 2400,
    carTypes: ["Sedan", "SUV", "MPV"],
    maxPassengers: 6,
    stay: "Extra",
    food: "Extra",
    languages: "English, Kannada, Hindi"
  },
  {
    name: "Imran Khan",
    city: "Hyderabad",
    experience: 11,
    rating: 4.9,
    dailyCharge: 2800,
    carTypes: ["SUV", "MPV", "Luxury"],
    maxPassengers: 7,
    stay: "Included",
    food: "Extra",
    languages: "English, Telugu, Hindi"
  },
  {
    name: "Karthik Rao",
    city: "Chennai",
    experience: 5,
    rating: 4.6,
    dailyCharge: 2100,
    carTypes: ["Hatchback", "Sedan"],
    maxPassengers: 4,
    stay: "Extra",
    food: "Included",
    languages: "English, Tamil"
  },
  {
    name: "Sanjay Verma",
    city: "Mumbai",
    experience: 13,
    rating: 4.7,
    dailyCharge: 3200,
    carTypes: ["Luxury", "SUV", "Sedan"],
    maxPassengers: 5,
    stay: "Included",
    food: "Included",
    languages: "English, Hindi, Marathi"
  }
];

export const sampleRequests = [
  {
    name: "Nisha Rao",
    route: "Bengaluru to Chennai",
    type: "Wants to drive",
    status: "Pending",
    message: "License uploaded. Comfortable with highway driving."
  },
  {
    name: "Dev Sharma",
    route: "Pune to Mumbai",
    type: "Passenger seat",
    status: "Approved",
    message: "Needs one seat and small luggage space."
  }
];

export function money(value) {
  return `Rs ${Number(value).toLocaleString("en-IN")}`;
}

export function getStoredRides() {
  if (typeof window === "undefined") {
    return [...baseRides];
  }

  try {
    const stored = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
    return [...stored, ...baseRides];
  } catch {
    return [...baseRides];
  }
}

export function saveRide(ride) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const stored = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
    window.localStorage.setItem(storageKey, JSON.stringify([ride, ...stored]));
  } catch {
    window.localStorage.setItem(storageKey, JSON.stringify([ride]));
  }
}
