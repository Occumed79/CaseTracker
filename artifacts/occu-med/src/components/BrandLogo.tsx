export function BrandLogo({ large = false }: { large?: boolean }) {
  return (
    <span className={`brand-logo ${large ? "brand-logo-large" : ""}`}>
      <img src="/occu-med-logo.png" alt="Occu-Med" />
    </span>
  );
}
