import { NavLink } from "react-router-dom";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getFilterStatus, getSearchText } from "../redux/action";
import { Image } from "../images";

export function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  let { productList, searchText, isFilter } = useSelector(
    (state) => state.ProductReducer,
  );
  let cartData = productList.filter((el) => el.isAdded);
  const closeIcon = Image.close;
  let noOfProduct = 0;
  cartData.map((el) => {
    noOfProduct = el.quantity + noOfProduct;
  });
  return (
    <div className="bg-wrap">
      <div className="navbar-outer">
        <div className="navbar-inner">
          <NavLink to="/" className="logo">
            Fieldstore
          </NavLink>
          {location.pathname === "/featured" && (
            <div className="search-bar">
              <span className="icon">⌕</span>
              <input
                placeholder="Search products, brands, categories"
                type="Text"
                value={searchText}
                onChange={(e) => dispatch(getSearchText(e.target.value))}
              />
              {searchText && (
                <div
                  className="delete-icon"
                  onClick={() => dispatch(getSearchText(""))}
                >
                  <img
                    src={closeIcon}
                    style={{
                      height: "12px",
                      width: "12px",
                    }}
                  ></img>
                </div>
              )}
              <div
                className="filter-icon"
                onClick={() => dispatch(getFilterStatus(!isFilter))}
              >
                <img
                  src={isFilter ? Image.filterOn : Image.filterOff}
                  style={{ height: "25px", width: "25px" }}
                />
              </div>
            </div>
          )}
          <div className="nav-links">
            <NavLink to="/" className="links">
              Home
            </NavLink>
            <NavLink to="/featured" className="links">
              Featured
            </NavLink>
            <NavLink to="/orders" className="links">
              Orders
            </NavLink>
            <NavLink to="/cart" className="links">
              Cart
              {cartData.length > 0 ? (
                <div className="cart-count">{noOfProduct}</div>
              ) : (
                <></>
              )}
            </NavLink>
            <NavLink to="/login" className="links">
              Log in
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
