import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import ClinicContactBlock from "@/components/ClinicContactBlock";

export const metadata: Metadata = {
  title: "Medical Disclaimer | Beverly Hills Clinic Karachi",
  description:
    "Information on this website is general and does not replace a consultation. Results of dental and aesthetic treatments vary between patients.",
  alternates: { canonical: "https://beverlyhillsclinic.com.pk/medical-disclaimer" },
};

export default function MedicalDisclaimerPage() {
  return (
    <LegalPage
      title="Medical Disclaimer"
      subtitle="Information to help you decide, not a replacement for a consultation"
      lastUpdated="October 2026"
      intro={
        <p>
          The information on beverlyhillsclinic.com.pk about dental and aesthetic treatments is provided for general
          education only. It is not medical advice and does not create a clinician-patient relationship.
        </p>
      }
      sections={[
        {
          id: "consultation",
          title: "Always Consult a Clinician",
          body: (
            <p>
              Whether a treatment is suitable for you can only be decided after an in-person (or online) assessment by a
              qualified clinician who reviews your medical history, examination and, where needed, X-rays or scans.
            </p>
          ),
        },
        {
          id: "results",
          title: "Results Vary",
          body: (
            <p>
              Treatment outcomes, recovery times and the number of visits differ from patient to patient. Timeframes such as
              &ldquo;2&ndash;3 visits&rdquo; are typical examples, not guarantees. Before-and-after photos show individual
              patients and do not promise the same result for you.
            </p>
          ),
        },
        {
          id: "risks",
          title: "Risks & Side Effects",
          body: (
            <p>
              All dental and aesthetic procedures carry some risk. Your clinician will explain the risks, benefits and
              alternatives that apply to you before you give consent.
            </p>
          ),
        },
        {
          id: "emergencies",
          title: "Emergencies",
          body: (
            <p>
              This website is not for emergencies. If you have severe swelling, bleeding, difficulty breathing or another
              urgent medical problem, call Rescue 1122 or go to the nearest hospital emergency department.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Questions",
          body: <ClinicContactBlock />,
        },
      ]}
    />
  );
}
