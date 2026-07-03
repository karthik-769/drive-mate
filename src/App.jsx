import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PassengerPage from "./pages/PassengerPage";
import OwnerPage from "./pages/OwnerPage";
import SharedDrivingPage from "./pages/SharedDrivingPage";
import HireDriverPage from "./pages/HireDriverPage";
import ContactPage from "./pages/ContactPage";
import SafetyPage from "./pages/SafetyPage";
import TermsPage from "./pages/TermsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/passenger" element={<PassengerPage />} />
      <Route path="/owner" element={<OwnerPage />} />
      <Route path="/shared-driving" element={<SharedDrivingPage />} />
      <Route path="/hire-driver" element={<HireDriverPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/safety" element={<SafetyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
