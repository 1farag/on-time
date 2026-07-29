type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
  italic?: boolean;
};

export const GradientText = ({
  children,
  className = "",
  italic = false,
}: GradientTextProps) => {
  return (
    <span
      className={`inline-block ${italic ? "italic" : ""} pe-2 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(103deg, #E2B45F 0%, #D4A24C 50%, #A6782F 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </span>
  );
};
