import "./CheckboxComponentStyle.css";

export function CheckboxComponent({
  onChange,
  checkboxOptions,
  checkboxOptions2,
}) {
  return (
    <>
      {checkboxOptions && (
        <>
          {checkboxOptions.map((el) => (
            <div key={el.name}>
              <input
                id={el.name}
                name={el.name}
                type="checkbox"
                checked={el.isActive}
                onChange={onChange}
              />
              <label htmlFor={el.name}>{el.name}</label>
            </div>
          ))}
        </>
      )}
      {checkboxOptions2 && (
        <>
          {checkboxOptions2.map((el) => (
            <div key={el.name}>
              <input
                id={el.name}
                name={el.name}
                type="checkbox"
                checked={el.isActive}
                onChange={onChange}
              />
              <label htmlFor={el.name}>{el.name}</label>
            </div>
          ))}
        </>
      )}
    </>
  );
}
