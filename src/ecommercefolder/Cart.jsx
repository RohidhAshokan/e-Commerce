import { useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductList } from "../redux/action";

export function Cart() {
  const dispatch = useDispatch();
  let { productList } = useSelector((state) => state.ProductReducer);
  let cartData = productList.filter((el) => el.isAdded);
  let subTotal = 0;
  let shippingCharge = cartData.length * 50;
  cartData.map((el) => {
    let price = el.price.replaceAll("₹", "").replaceAll(",", "");
    let noOfProduct = +price * el.quantity 
    subTotal = noOfProduct + Number(subTotal);
  });
  let total = subTotal + shippingCharge;
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

  return (
    <div className="bg-wrap">
      <div className="cart-page">
        <h1 className="cart-page-head">Your cart</h1>

        {productList
          .filter((el) => el.isAdded)
          .map((el) => (
            <div className="cart-item" key={el.id}>
              <div className="cart-item-thumb">
                <img src={el.image} style={{ height: "88px", width: "88px" }} />
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
          ))}
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
            <ButtonComponent variant={"primaryFullWidth"}>
              Checkout
            </ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  );
}
