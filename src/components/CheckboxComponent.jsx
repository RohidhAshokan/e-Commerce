import "./CheckboxComponentStyle.css";
import { useSelector } from "react-redux";

export function CheckboxComponent({ onChange, data }) {
  return (
    <>
      {data.map((el) => (
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
  );
}
