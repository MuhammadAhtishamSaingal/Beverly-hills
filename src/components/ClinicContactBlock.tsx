import { locations, CLINIC_EMAIL, CLINIC_PHONE, CLINIC_PHONE_RAW } from "@/data/locations";

export default function ClinicContactBlock() {
  return (
    <>
      <p>
        Phone: <a href={`tel:${CLINIC_PHONE_RAW}`}>{CLINIC_PHONE}</a> · Email:{" "}
        <a href={`mailto:${CLINIC_EMAIL}`}>{CLINIC_EMAIL}</a>
      </p>
      <ul>
        {locations.map((loc) => (
          <li key={loc.slug}>
            <strong>{loc.name}:</strong> {loc.address}
          </li>
        ))}
      </ul>
    </>
  );
}
