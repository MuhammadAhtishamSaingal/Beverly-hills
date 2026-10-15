import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import ClinicContactBlock from "@/components/ClinicContactBlock";
import { CLINIC_EMAIL } from "@/data/locations";

export const metadata: Metadata = {
  title: "Privacy Policy | Beverly Hills Clinic Karachi",
  description:
    "How Beverly Hills Clinic (DHA Phase 5 & Bahadurabad, Karachi) collects, uses and protects your personal and health information.",
  alternates: { canonical: "https://beverlyhillsclinic.com.pk/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="Your privacy and medical confidentiality are important to us"
      lastUpdated="October 2026"
      intro={
        <p>
          This Privacy Policy explains how Beverly Hills Clinic (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, shares
          and protects your information when you visit beverlyhillsclinic.com.pk, book an appointment, call or message us,
          or receive treatment at our DHA Phase 5 or Bahadurabad clinics in Karachi.
        </p>
      }
      sections={[
        {
          id: "who-we-are",
          title: "Who We Are",
          body: (
            <>
              <p>Beverly Hills Clinic is a dental and aesthetic clinic in Karachi, Pakistan. You can reach us at:</p>
              <ClinicContactBlock />
            </>
          ),
        },
        {
          id: "information-we-collect",
          title: "Information We Collect",
          body: (
            <>
              <p>
                <strong>Information you give us</strong> when you book online, call, WhatsApp or visit:
              </p>
              <ul>
                <li>Name, phone number, email address (optional) and WhatsApp preference</li>
                <li>Preferred clinic, treatment, date and time, whether you are a new or existing patient</li>
                <li>How you heard about us, and any notes or concerns you choose to share</li>
                <li>
                  At the clinic: medical and dental history, examination notes, X-rays, photographs and treatment records
                </li>
              </ul>
              <p>
                <strong>Information collected automatically</strong> when you use our website: pages visited, device and
                browser type, approximate location, and advertising click identifiers (such as Google Ads &ldquo;gclid&rdquo;
                and UTM campaign tags) so we know which advert or page led to your enquiry.
              </p>
            </>
          ),
        },
        {
          id: "how-we-use-information",
          title: "How We Use Your Information",
          body: (
            <ul>
              <li>To confirm, schedule and remind you about appointments by phone, WhatsApp or email</li>
              <li>To assess, plan and provide your dental or aesthetic treatment safely</li>
              <li>To answer your questions and provide aftercare support</li>
              <li>To understand which adverts and pages bring patients to us, and to improve our website</li>
              <li>To meet our legal, professional and record-keeping obligations</li>
            </ul>
          ),
        },
        {
          id: "health-information",
          title: "Health Information & Confidentiality",
          body: (
            <>
              <p>
                Medical and dental information is treated as strictly confidential. It is only accessed by the clinicians and
                staff involved in your care, and shared with third parties (for example a dental laboratory making your
                veneers or crowns, or a specialist you are referred to) only when needed for your treatment, with your
                consent, or when required by law.
              </p>
              <p>
                We do <strong>not</strong> use your health information for advertising, and we do not create advertising
                audiences based on health conditions.
              </p>
            </>
          ),
        },
        {
          id: "cookies-and-advertising",
          title: "Cookies, Analytics & Advertising",
          body: (
            <>
              <p>
                Our website uses cookies and similar technologies from Google (Google Analytics and Google Ads) and Meta
                (Facebook/Instagram Pixel) to measure visits, see which adverts lead to calls or bookings, and improve our
                marketing. These tools may record that you visited our website, but they do not receive your medical
                details.
              </p>
              <p>
                You can block or delete cookies in your browser settings, manage Google advertising preferences at{" "}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
                  adssettings.google.com
                </a>
                , and manage Meta advertising preferences in your Facebook or Instagram settings.
              </p>
            </>
          ),
        },
        {
          id: "sharing",
          title: "Who We Share Information With",
          body: (
            <>
              <p>We never sell your personal information. We only share it with:</p>
              <ul>
                <li>Service providers who run our website, email and booking systems on our behalf</li>
                <li>Laboratories, specialists or hospitals involved in your treatment</li>
                <li>Authorities, regulators or courts when the law requires it</li>
              </ul>
            </>
          ),
        },
        {
          id: "retention",
          title: "How Long We Keep Information",
          body: (
            <p>
              Online enquiries that do not lead to treatment are kept for up to 24 months and then deleted. Patient
              treatment records are kept for as long as required by law and professional guidelines for medical records.
            </p>
          ),
        },
        {
          id: "data-security",
          title: "Data Security",
          body: (
            <p>
              Our website uses encrypted (HTTPS) connections. Access to patient records is limited to authorised staff, and
              we take reasonable technical and organisational measures to protect your information against loss or misuse.
            </p>
          ),
        },
        {
          id: "your-rights",
          title: "Your Rights",
          body: (
            <p>
              You can ask to see, correct or delete the personal information we hold about you, or ask us to stop contacting
              you for marketing, by emailing <a href={`mailto:${CLINIC_EMAIL}`}>{CLINIC_EMAIL}</a> or calling the clinic.
              Some medical records must be kept by law even if you ask us to delete them.
            </p>
          ),
        },
        {
          id: "children",
          title: "Children",
          body: (
            <p>
              Appointments for patients under 18 should be booked by a parent or legal guardian, who should also be present
              for consultations and consent.
            </p>
          ),
        },
        {
          id: "updates",
          title: "Changes to This Policy",
          body: (
            <p>
              We may update this Privacy Policy from time to time. The latest version is always on this page. Please also
              read our <Link href="/terms-and-conditions">Terms &amp; Conditions</Link> and{" "}
              <Link href="/appointment-policy">Appointment &amp; Cancellation Policy</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
