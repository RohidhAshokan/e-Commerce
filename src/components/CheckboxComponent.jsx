import "./CheckboxComponentStyle.css";

export function CheckboxComponent({
  onChange,
  categoryCheckbox,
  colorCheckbox,
}) {
  return (
    <>
      {categoryCheckbox && (
        <>
          {categoryCheckbox.map((el) => (
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
      {colorCheckbox && (
        <>
          {colorCheckbox.map((el) => (
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
