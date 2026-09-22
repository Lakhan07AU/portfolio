type SectionHeadingProps = {
  label: string;
  title: React.ReactNode;
  sub?: string;
  align?: "left" | "center";
};

export function SectionHeading({ label, title, sub, align = "left" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
      <span className={`section-label ${centered ? "justify-center" : ""}`}>{label}</span>
      <h2
        className={`mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl ${
          centered ? "mx-auto max-w-2xl" : ""
        }`}
      >
        {title}
      </h2>
      {sub ? (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg ${
            centered ? "mx-auto" : ""
          }`}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}