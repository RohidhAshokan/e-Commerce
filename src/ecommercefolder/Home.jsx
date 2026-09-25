import { NavLink } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import { Image } from "../images";
import { useSelector } from "react-redux";
import "./styles.css";

export function Home() {
  const collectionCard = [
    { name: "Outwear", image: Image.outwearCategory },
    { name: "Bags & Accessories", image: Image.bagCategory },
    { name: "Footwear", image: Image.footwearCategory },
  ];
  const {productList}  = useSelector((state)=> state.ProductReducer)
  return (
    <div className="bg-wrap">
      <div className="feature">
        <div className="feature-text">
          <span className="mini-head">New arrivals</span>
          <h1 className="head">Everyday goods, chosen carefully</h1>
          <p className="para">
            A small, considered catalogue of things for the home and the
            outdoors — built to last, not to trend.
          </p>
          <ButtonComponent className="browse-btn">
            Browse featured
          </ButtonComponent>
        </div>
        <div className="feature-pic-wrap">
          <img src={Image.cfb} style={{ height: "435.425px", width: "610px" }} />
          <div className="feature-float">
            <strong className="float-name">Canvas field bag</strong>
            <span className="float-price">From ₹8,189</span>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="flex-head">
          <h2 className="section-head">Featured this week</h2>
          <NavLink to="/featured">
            <div className="view-all">View all →</div>
          </NavLink>
        </div>
        <div className="grid">
          {productList.slice(0, 4).map((el) => {
            return (
              <NavLink to="/featured" key={el.id}>
                <div className="card">
                  <div className="card-media">
                    <div className="swatch sw1">
                      <img
                        src={el.image}
                        style={{ height: "254px", width: "277.6px" }}
                      />
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
      </div>
      <div className="section" style={{ paddingTop: "0" }}>
        <h2 className="section-head">Shop by collection</h2>
        <div className="collections">
          {collectionCard.map((el) => {
            return (
              <div className="collection-card" key={el.name}>
                <div className="collection-image-fill">
                  <img
                    src={el.image}
                    style={{ height: "285px", width: "380px" }}
                  />
                </div>
                <div className="collection-label">{el.name}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="end-card">
        <span>© Fieldstore</span>
        <span>Shipping · Returns · Support</span>
      </div>
    </div>
  );
}
