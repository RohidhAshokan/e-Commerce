import { Navigate, NavLink, useNavigate } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import Collection from "../components/Collection";
import { Image } from "../images";
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesCb, getCategoryId } from "../redux/action";
import "./styles.css";

export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList, categoriesCb } = useSelector(
    (state) => state.ProductReducer,
  );
  function handleCollection(elId) {
    dispatch(getCategoryId(elId));
    navigate('/featured')  
  }
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
          <ButtonComponent
            className="browse-btn"
            onClick={()=>navigate("/featured")}
          >
            Browse featured
          </ButtonComponent>
        </div>
        <div className="feature-pic-wrap">
          <img
          className="card-img cfb-img"
            src={Image.cfb}
            alt="Canvas field bag"
            // style={{ height: "435.425px", width: "610px" }}
          />
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
                      className="card-img"
                        src={el.image}
                        alt={el.name}
                        // style={{ height: "254px", width: "277.6px" }}
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
      <div className="section">
        <Collection
          handleCollection={handleCollection}
          picLable={"Shop by collection"}
          picHeight={"285px"}
          picWidth={"380px"}
        />
      </div>
      <div className="end-card">
        <span>© Fieldstore</span>
        <span>Shipping · Returns · Support</span>
      </div>
    </div>
  );
}
