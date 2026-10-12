import { NavLink } from "react-router-dom";

export default function FeatureSample({productList}) {
  return (
    <div className="grid grid-3">
      {productList.slice(0, 3).map((el) => {
        return (
          <NavLink to="/featured" key={el.id}>
            <div className="card">
              <div className="card-media">
                <div className="swatch sw1">
                  <img className="card-img" src={el.image} alt={el.name} />
                </div>
              </div>
              <div className="card-title">{el.name}</div>
              <div className="card-sub" style={{ display: "flex" }}>
                {el.colors.name}
              </div>
              <div className="card-price">{el.price}</div>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
}
