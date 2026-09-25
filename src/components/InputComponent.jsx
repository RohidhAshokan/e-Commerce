export function InputComponent({
  type = Text,
  placeholder,
  value,
  disabled,
  onChange,
}) {
  return (
    <>
      <div>
        <input
          style={{...inputStyle, cursor: "pointer" }}
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={onChange}
        />
      </div>
    </>
  );
}
const inputStyle = {
  width: "100%",
  height: "44px",
  border: "1px solid #e4e2d8",
  borderRadius: "6px",
  padding: "0 14px",
  fontSize: "14px",
  fontFamily: "Inter",
  background: "#f5f4ef",
};
