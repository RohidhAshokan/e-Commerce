import { useEffect, useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductList } from "../redux/action";
import { NavLink } from "react-router-dom";
import { Image } from "../images";
import { useNavigate } from "react-router-dom";
import { getOrderList } from "../redux/action";
import moment from "moment";
import { statusList } from "../constants";

export function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [recepit, setRecepit] = useState([]);
  let { productList, orderList } = useSelector((state) => state.ProductReducer);
  let cartData = productList.filter((el) => el.isAdded);
  let subTotal = 0;
  let shippingCharge = cartData.length * 50;
  let checkoutSubTotal = 0;
  let checkoutShippingCharge = 0;
  let checkoutTotal;
  cartData.map((el) => {
    let price = el.price.replaceAll("₹", "").replaceAll(",", "");
    let noOfProduct = +price * el.quantity;
    subTotal = noOfProduct + Number(subTotal);
  });
  let total = subTotal + shippingCharge;
  if (orderList.length > 0) {
    orderList.map((el) => {
      let price = el.price?.replaceAll("₹", "").replaceAll(",", "");
      let noOfProduct = +price * el.quantity;
      checkoutSubTotal = noOfProduct + Number(checkoutSubTotal);
    });
    checkoutShippingCharge = orderList.length * 50;
    checkoutTotal = checkoutSubTotal + checkoutShippingCharge;
  }
  const handleAddProduct = (el) => {
    let updatedProductList = productList.map((item) => {
      if (item.id === el.id) {
        let productQuantity = el.quantity;
        return { ...item, quantity: productQuantity + 1 };
      } else return item;
    });
    dispatch(getProductList(updatedProductList));
  };
  const handleRemoveProduct = (el) => {
    let updatedProductList = productList.map((item) => {
      if (item.id === el.id && el.quantity > 1) {
        let productQuantity = el.quantity;
        return { ...item, quantity: productQuantity - 1 };
      } else if (el.quantity === 1 && item.id === el.id) {
        return { ...item, isAdded: false, quantity: 0 };
      } else return item;
    });
    dispatch(getProductList(updatedProductList));
  };
  const handleRemove = (el) => {
    let updatedProductList = productList.map((item) => {
      if (item.id === el.id) {
        return { ...item, isAdded: false, quantity: 0 };
      } else return item;
    });
    dispatch(getProductList(updatedProductList));
  };
  function handleCheckout() {
    const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
    const orderId = `ORD-${randomHex}`;
    const randomStatus = statusList[Math.floor(Math.random() * statusList.length)];
    const status = randomStatus;
    let updatedCartList = cartData.map((el) => {
      return {
        ...el,
        checkoutAt: moment(new Date()).format("MMMM Do YYYY, h:mm a"),
        orderId,
        status,
      };
    });
    dispatch(getOrderList([...orderList, ...updatedCartList]));
    setRecepit(cartData);
    let updatedProductList = productList.map((item) => {
      return { ...item, isAdded: false, quantity: 0 };
    });
    dispatch(getProductList(updatedProductList));
  }
  const handleRedrectFeatures = () => navigate("/featured");
  const handleTrackOrder = () => navigate("/orders");
  const handleContinueShopping = () => navigate("/featured");
  return (
    <>
      {recepit.length > 0 ? (
        <div
          style={{
            padding: "56px 48px",
            maxWidth: "920px",
            margin: "auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <div>
              <img
                src={Image.checkMark}
                style={{
                  height: "52px",
                  width: "52px",
                  marginBottom: "14px",
                }}
              />
            </div>
            <h2 className="cart-empty-head">Thanks, your order is placed</h2>
            <p className="cart-empty-para">
              Order #FS-10482. We've sent a confirmation to your email.
            </p>
          </div>
          {recepit?.map((el) => {
            return (
              <div
                className="cart-item"
                key={el.id}
                style={{
                  padding: "10px 20px",
                  gridTemplateColumns: "60px 1fr auto",
                }}
              >
                <div
                  className="cart-item-thumb"
                  style={{ height: "60px", width: "60px" }}
                >
                  <img
                    src={el.image}
                    style={{ height: "60px", width: "60px" }}
                  />
                </div>
                <div>
                  <div className="cart-item-name">{el.name}</div>
                  <div
                    className="cart-item-meta"
                    style={{ display: "flex", gap: "10px" }}
                  >
                    {el.colors.name}
                    <div className="cart-item-meta">{el.quantity} · Qty </div>
                  </div>
                </div>
                <div className="cart-item-price">{el.price}</div>
              </div>
            );
          })}

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{checkoutSubTotal}.00</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>₹{checkoutShippingCharge}.00</span>
            </div>
            <div className="summary-row total">
              <span>Total paid</span>
              <span>₹{checkoutTotal}.00</span>
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                gap: "10px",
              }}
            >
              <ButtonComponent
                variant={"primaryFullWidth"}
                onClick={handleTrackOrder}
              >
                Track order
              </ButtonComponent>
              <ButtonComponent
                variant={"outlineFullWidth"}
                onClick={handleContinueShopping}
              >
                Continue shopping
              </ButtonComponent>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-page">
          <h1 className="cart-page-head">Your cart</h1>
          {cartData.length === 0 && <div className="cart-rule-line"></div>}
          {productList
            .filter((el) => el.isAdded)
            .map((el) => (
              <div className="cart-item" key={el.id}>
                <div className="cart-item-thumb">
                  <img
                    src={el.image}
                    style={{ height: "88px", width: "88px" }}
                  />
                </div>
                <div>
                  <div className="cart-item-name">{el.name}</div>
                  <div className="cart-item-meta">{el.colors.name}</div>
                  <div
                    onClick={() => handleRemove(el)}
                    style={{ cursor: "pointer" }}
                    className="cart-remove"
                  >
                    Remove
                  </div>
                </div>
                <div className="qty-control">
                  <button onClick={() => handleRemoveProduct(el)}>-</button>
                  <span>{el.quantity}</span>
                  <button onClick={() => handleAddProduct(el)}>+</button>
                </div>
                <div className="cart-item-price">{el.price}</div>
              </div>
            ))}{" "}
          {cartData.length > 0 ? (
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>₹{shippingCharge.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div style={{ marginTop: "20px" }}>
                <ButtonComponent
                  variant={"primaryFullWidth"}
                  onClick={handleCheckout}
                >
                  Checkout
                </ButtonComponent>
              </div>
            </div>
          ) : (
            <div>
              <div className="cart-empty-wrap">
                <div>
                  <img
                    src={Image.shoppingBagIcon}
                    style={{
                      height: "40px",
                      width: "40px",
                      marginBottom: "16px",
                    }}
                  />
                </div>
                <h2 className="cart-empty-head">Your cart is empty</h2>
                <p className="cart-empty-para">
                  Pieces you add will show up here.
                </p>
                <ButtonComponent
                  variant={"primary"}
                  onClick={handleRedrectFeatures}
                >
                  Continue shopping
                </ButtonComponent>
                <p className="cart-empty-para-links">
                  Or{" "}
                  <NavLink to="/orders">
                    <span className="cart-empty-links">view your orders</span>
                  </NavLink>
                </p>
              </div>
              <div className="cart-rule-line"></div>
              <h2
                className="section-head"
                style={{ paddingTop: "15px", fontSize: "20px" }}
              >
                Featured this week
              </h2>
              <div
                className="grid"
                style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
              >
                {productList.slice(0, 3).map((el) => {
                  return (
                    <NavLink to="/featured" key={el.id}>
                      <div className="card">
                        <div className="card-media">
                          <div className="swatch sw1">
                            <img
                              src={el.image}
                              style={{
                                height: "258.663px",
                                width: "258.663px",
                              }}
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
          )}
        </div>
      )}
    </>
  );
}
