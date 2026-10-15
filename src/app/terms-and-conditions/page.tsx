import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import ClinicContactBlock from "@/components/ClinicContactBlock";
import { CONSULTATION_FEE } from "@/data/locations";

export const metadata: Metadata = {
  title: "Terms & Conditions | Beverly Hills Clinic Karachi",
  description:
    "Terms for using the Beverly Hills Clinic website and booking dental and aesthetic appointments at our DHA Phase 5 and Bahadurabad clinics.",
  alternates: { canonical: "https://beverlyhillsclinic.com.pk/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      subtitle="Please read these terms before using our website or booking"
      lastUpdated="October 2026"
      intro={
        <p>
          These Terms &amp; Conditions apply to your use of beverlyhillsclinic.com.pk and to appointments booked with
          Beverly Hills Clinic at our DHA Phase 5 and Bahadurabad clinics in Karachi, or online. By using the website or
          booking an appointment, you agree to these terms.
        </p>
      }
      sections={[
        {
          id: "website-information",
          title: "Website Information",
          body: (
            <p>
              Content on this website is for general information about our services. It is not a diagnosis or a
              substitute for a consultation with a qualified clinician. See our{" "}
              <Link href="/medical-disclaimer">Medical Disclaimer</Link>.
            </p>
          ),
        },
        {
          id: "appointments",
          title: "Appointments & Booking Requests",
          body: (
            <>
              <p>
                Submitting the online form is a <strong>request</strong>, not a confirmed booking. Your appointment is
                confirmed only when our team contacts you by phone or WhatsApp and agrees a date and time with you.
              </p>
              <p>
                Rescheduling, cancellations and late arrivals are covered by our{" "}
                <Link href="/appointment-policy">Appointment &amp; Cancellation Policy</Link>.
              </p>
            </>
          ),
        },
        {
          id: "fees",
          title: "Consultation Fee & Treatment Costs",
          body: (
            <>
              <p>
                The consultation fee is <strong>{CONSULTATION_FEE}</strong>, payable at the clinic (or before an online
                consultation). Consultations are not free.
              </p>
              <p>
                The cost of any treatment depends on your clinical assessment. Your clinician will explain the proposed
                treatment plan and its cost before treatment starts. Prices shown or discussed elsewhere are estimates and may
                change if your clinical needs change.
              </p>
            </>
          ),
        },
        {
          id: "payments",
          title: "Payments",
          body: (
            <p>
              Payments are made at the clinic using the payment methods available at the reception. Treatments that require
              laboratory work (for example veneers, crowns, bridges, dentures or implants) may require part payment before
              the laboratory work is ordered; this will be explained to you in advance.
            </p>
          ),
        },
        {
          id: "treatment-consent",
          title: "Treatment & Informed Consent",
          body: (
            <ul>
              <li>Every treatment is preceded by an assessment and an explanation of benefits, risks and alternatives.</li>
              <li>You will be asked to give informed consent before treatment begins.</li>
              <li>Results differ from person to person and cannot be guaranteed.</li>
            </ul>
          ),
        },
        {
          id: "patient-responsibilities",
          title: "Your Responsibilities",
          body: (
            <ul>
              <li>Give complete and accurate information about your health, medicines and allergies.</li>
              <li>Follow the aftercare instructions and attend review appointments.</li>
              <li>Treat our staff and other patients with respect.</li>
            </ul>
          ),
        },
        {
          id: "intellectual-property",
          title: "Website Content",
          body: (
            <p>
              Text, images, videos and logos on this website belong to Beverly Hills Clinic or are used with permission.
              Please do not copy or reuse them without written permission.
            </p>
          ),
        },
        {
          id: "liability",
          title: "Limitation of Liability",
          body: (
            <p>
              We work to keep the website accurate and available, but we do not guarantee that it is always error-free or
              uninterrupted. To the extent permitted by law, we are not liable for losses arising from reliance on website
              content without a consultation.
            </p>
          ),
        },
        {
          id: "law",
          title: "Governing Law",
          body: <p>These terms are governed by the laws of Pakistan, and the courts of Karachi have jurisdiction.</p>,
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
