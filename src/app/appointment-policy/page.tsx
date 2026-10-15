import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import ClinicContactBlock from "@/components/ClinicContactBlock";
import { CONSULTATION_FEE, CLINIC_PHONE, CLINIC_PHONE_RAW } from "@/data/locations";

export const metadata: Metadata = {
  title: "Appointment & Cancellation Policy | Beverly Hills Clinic Karachi",
  description:
    "How to book, confirm, reschedule or cancel appointments at Beverly Hills Clinic in DHA Phase 5 and Bahadurabad, Karachi.",
  alternates: { canonical: "https://beverlyhillsclinic.com.pk/appointment-policy" },
};

export default function AppointmentPolicyPage() {
  return (
    <LegalPage
      eyebrow="Patient Info"
      title="Appointment & Cancellation Policy"
      subtitle="So every patient gets unhurried, on-time care"
      lastUpdated="October 2026"
      intro={
        <p>
          This policy explains how appointments are booked, confirmed, rescheduled and cancelled at our DHA Phase 5 and
          Bahadurabad clinics and for online consultations.
        </p>
      }
      sections={[
        {
          id: "booking",
          title: "Booking & Confirmation",
          body: (
            <ul>
              <li>
                Book online, call <a href={`tel:${CLINIC_PHONE_RAW}`}>{CLINIC_PHONE}</a>, or message us on WhatsApp.
              </li>
              <li>Choose your clinic: DHA Phase 5, Bahadurabad, or an online consultation.</li>
              <li>
                Online requests are confirmed once our team calls or WhatsApps you with a confirmed date and time.
              </li>
            </ul>
          ),
        },
        {
          id: "consultation-fee",
          title: "Consultation Fee",
          body: (
            <p>
              The consultation fee is <strong>{CONSULTATION_FEE}</strong>. It covers your assessment and a personalised
              treatment plan, and is payable at the clinic (or in advance for online consultations).
            </p>
          ),
        },
        {
          id: "rescheduling",
          title: "Rescheduling & Cancellations",
          body: (
            <ul>
              <li>Please let us know at least 24 hours before your appointment if you need to reschedule or cancel.</li>
              <li>Repeated missed appointments without notice may mean we ask for advance payment for future bookings.</li>
            </ul>
          ),
        },
        {
          id: "late-arrival",
          title: "Late Arrival",
          body: (
            <p>
              Please arrive 10 minutes early. If you arrive more than 15 minutes late we will try to see you, but we may need
              to shorten or reschedule your appointment so other patients are not delayed.
            </p>
          ),
        },
        {
          id: "lab-treatments",
          title: "Treatments Involving Laboratory Work",
          body: (
            <p>
              Veneers, smile makeovers, crowns, bridges, dentures and implant restorations are custom-made. Any advance
              payment needed before the laboratory work is ordered will be explained before you agree to treatment.
            </p>
          ),
        },
        {
          id: "refunds",
          title: "Refunds",
          body: (
            <p>
              Fees for consultations and treatment already provided are not refundable. If you have paid in advance for
              treatment that has not started, please contact us and we will review your request individually.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact Us",
          body: <ClinicContactBlock />,
        },
      ]}
    />
  );
}
