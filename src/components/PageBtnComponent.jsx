export default function PageBtnComponent({
  children,
  onClick,
  variant,
  disabled = false,
}) {
  const btnVariantStyle = disabled
    ? btnStyle.disabledRounded
    : btnStyle[variant] || btnStyle.primary;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...btnStyle.base,
        ...btnVariantStyle,
      }}
    >
      {children}
    </button>
  );
}

const btnStyle = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    width: "fit-content",
    transition: "opacity .15s",
    border: "none",
    borderRadius: "50%",
    height: "40px",
    width: "40px",
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "Inter , sans-serif",
  },
  primaryRounded: {
    border: "1px solid #3f5b44",
    background: "#3f5b44",
    color: "#fff",
  },
  outlineRounded: {
    background: "transparent",
    color: "#22221e",
    border: "1px solid #e4e2d8",
    WebkitFontSmoothing: "antialiased",
  },
  disabledRounded: {
    background: "#f1f1f3",
    color: "#22221e70",
    cursor: "not-allowed",
  },
};
