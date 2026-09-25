export default function ButtonComponent({
  children,
  onClick,
  variant,
  disabled = false,
}) {
  const btnVariantStyle = btnStyle[variant] || btnStyle.primary;

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
    fontFamily: "Inter , sans-serif",
    padding: " 12px 22px",
    borderRadius: "6px",
  },
  primary: {
    border: "1px solid #3f5b44",
    background: "#3f5b44", //--accent-- root color from style.css
    color: "#fff",
  },
  outline: {
    background: "transparent",
    color: "#22221e", //--ink--
    border: "1px solid #e4e2d8", //--border-- root color from style.css    WebkitFontSmoothing: "antialiased",
  },
  primaryFullWidth: {
    border: "1px solid #3f5b44",
    background: "#3f5b44",
    color: "#fff",
    width: "100%",
    justifyContent: "center",
  },
  outlineFullWidth: {
    background: "transparent",
    color: "#22221e", //--ink--
    border: "1px solid #e4e2d8",    WebkitFontSmoothing: "antialiased",
    width: "100%",
    justifyContent: "center",
  },
  dangerFullWidth: {
    border: "1px solid  #FF0000",
    background: " transparent",
    color: "#FF0000",
    width: "100%",
    justifyContent: "center",
    cursor: "not-allowed",
  },
  primaryRounded: {
    border: "1px solid #3f5b44",
    background: "#3f5b44",
    color: "#fff",
    borderRadius: "50%",
    height: "40px",
    width: "40px",
    alignSelf: "center",
    justifyContent: "center",
  },
  outlineRounded: {
    background: "transparent",
    color: "#22221e",
    border: "1px solid #e4e2d8", 
    WebkitFontSmoothing: "antialiased",
    borderRadius: "50%",
    height: "40px",
    width: "40px",
    alignSelf: "center",
    justifyContent: "center",
  },
};
