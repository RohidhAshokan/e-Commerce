import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import ButtonComponent from "../components/ButtonComponent";
import { Image } from "../images";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../components/Modal";
import { statusList } from "../constants";
import { PriceConversion } from "../common/PriceConversion";

export function Orders() {
  let { productList, orderList } = useSelector((state) => state.ProductReducer);
  const navigate = useNavigate();
  const [modalOpen, setmodalOpen] = useState(false);
  const [orderHistory, setOrderHistory] = useState(null);
  const uniqueOrdertId = [
    ...new Set(
      orderList.map((el) => {
        return el.orderId;
      }),
    ),
  ];

  const updatedOrderList = uniqueOrdertId.map((el) => {
    return {
      orderId: el,
      checkoutAt: orderList.find((it) => it.orderId === el).checkoutAt,
      status: orderList.find((it) => it.orderId === el).status,
      orders: orderList.filter((it) => it.orderId === el),
    };
  });
  let orderPrice = updatedOrderList.map((el) => {
    let subTotal = 0;
    let totalArr = [];
    el.orders.map((items) => {
      let price = items.price.replaceAll("₹", "").replaceAll(",", "");
      let noOfProduct = +price * items.quantity;
      subTotal = noOfProduct + Number(subTotal);
      return totalArr.push(subTotal);
    });
    if (totalArr.length > 1) {
      totalArr = totalArr[totalArr.length - 1];
    } else {
      totalArr = totalArr[0];
    }
    return [totalArr];
  });
  const handleViewOrder = (el) => {
    setmodalOpen(true);
    setOrderHistory(el);
  };
  const handleModalClose = () => setmodalOpen(false);
  const handleRedrectFeatures = () => navigate("/featured");

  const closeIcon = Image.close;
  let subTotal = 0;
  let shippingCharge = 0;
  orderHistory?.orders?.map((el) => {
    shippingCharge = orderHistory.orders.length * 50;
    let price = el.price.replaceAll("₹", "").replaceAll(",", "");
    let noOfProduct = +price * el.quantity;
    subTotal = noOfProduct + Number(subTotal);
  });
  let total = subTotal + shippingCharge;
  const statusIndex = statusList.indexOf(orderHistory?.status);

  return (
    <>
      {updatedOrderList.length > 0 ? (
        <div className="orders-page">
          <h1 className="cart-page-head" style={{ marginBottom: "8px" }}>
            Your orders
          </h1>
          <div className="orders-page-sub-head">
            {updatedOrderList.length} orders in the last 6 months
          </div>
          <div style={{ display: "flex", flexDirection: "column-reverse" }}>
            {updatedOrderList.map((el, index) => (
              <div className="order-card" key={el.orderId}>
                <div className="order-head">
                  <span>
                    <strong className="order-head-strong">{el.orderId}</strong>{" "}
                    · {el.checkoutAt}
                  </span>
                  <span className="order-status">{el.status}</span>
                </div>
                {el.orders.slice(0, 2).map((item, idx) => (
                  <div
                    key={item.id}
                    className="cart-item"
                    style={{
                      padding: "10px 20px",
                      gridTemplateColumns: "60px 1fr auto",
                      ...(el.orders.length - 1 !== idx && {
                        borderBottom: "1px solid #e4e2d8",
                      }),
                    }}
                  >
                    <div
                      className="cart-item-thumb"
                      style={{ height: "64px", width: "64px" }}
                    >
                      <img
                        src={item.image}
                        style={{ height: "64px", width: "64px" }}
                      />
                    </div>
                    <div>
                      <div className="cart-item-name">{item.name}</div>
                      <div
                        className="cart-item-meta"
                        style={{ display: "flex", gap: "10px" }}
                      >
                        {item.colors.name}
                        <div className="cart-item-meta">
                          {" "}
                          · Qty {item.quantity}
                        </div>
                        <div
                          className="cart-item-price"
                          style={{ fontSize: "13px", fontWeight: "400" }}
                        >
                          ₹{item.price}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {el.orders.length > 2 && (
                  <div className="order-card-view-modal-wrap">
                    <div
                      className="order-card-view-modal"
                      onClick={() => handleViewOrder(el)}
                    >
                      + {el.orders.length - 2} more items
                    </div>
                    <span></span>
                  </div>
                )}
                <div className="order-card-footer">
                  <div className="order-card-footer-info">
                    {el.orders.length} items · Total{" "}
                    <span>{PriceConversion(orderPrice[index])}</span>
                  </div>
                  <ButtonComponent
                    variant={"outline"}
                    onClick={() => handleViewOrder(el)}
                  >
                    View order
                  </ButtonComponent>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="order-empty">
          <div className="cart-empty-wrap" style={{ paddingTop: "0" }}>
            <div>
              <img
                src={Image.shopingBox}
                style={{
                  height: "40px",
                  width: "40px",
                  marginBottom: "16px",
                }}
              />
            </div>
            <h2
              className="cart-empty-head"
              style={{
                fontFamily: "Newsreader, serif",
                fontSize: "24px",
                fontWeight: "500",
              }}
            >
              No orders yet
            </h2>
            <p className="cart-empty-para" style={{ margin: "0px" }}>
              When you place an order, you'll see it here with
            </p>
            <p className="cart-empty-para">tracking and delivery details.</p>
            <ButtonComponent
              variant={"primary"}
              onClick={handleRedrectFeatures}
            >
              Start shopping
            </ButtonComponent>
            <div style={{ paddingTop: "40px" }}>
              <div className="cart-rule-line"></div>
              <h2
                className="section-head"
                style={{ paddingTop: "15px", fontSize: "20px" }}
              >
                Featured this week
              </h2>
              <div
                className="grid grid-3"
                // style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
              >
                {productList.slice(0, 3).map((el) => {
                  return (
                    <NavLink to="/featured" key={el.id}>
                      <div className="card">
                        <div className="card-media">
                          <div className="swatch sw1">
                            <img
                              className="card-img"
                              src={el.image}
                              alt={el.name}
                              // style={{
                              //   height: "258.663px",
                              //   width: "258.663px",
                              // }}
                            />
                          </div>
                        </div>
                        <div className="card-title" style={{display:"flex"}}>{el.name}</div>
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
          </div>
        </div>
      )}
      <Modal modalOpen={modalOpen} handleModalClose={handleModalClose}>
        {orderHistory && (
          <div className="modal-wrap">
            <div className="modal-head-tab">
              <div>
                <div className="modal-head-orderid">{orderHistory.orderId}</div>
                <div className="modal-checkout">{orderHistory.checkoutAt}</div>
              </div>
              <div className="modal-status-wrap">
                <span className="modal-status">{orderHistory.status}</span>
                <div className="modal-close" onClick={handleModalClose}>
                  <img
                    src={closeIcon}
                    style={{
                      height: "12px",
                      width: "12px",
                      cursor: "pointer",
                    }}
                  ></img>
                </div>
              </div>
            </div>

            <div className="order-status-wrap">
              <div className="order-status-inner-body">
                {statusList.map((status, index) => {
                  return (
                    <div key={status}>
                      {index < statusIndex || statusIndex === 4 ? (
                        <div>
                          <div className={`order-status-completed`}>
                            <div style={{ fontSize: "12px", color: "#fff" }}>
                              ✔
                            </div>
                          </div>
                          {status}
                        </div>
                      ) : index === statusIndex ? (
                        <div>
                          <div className="order-status-inprogress"></div>
                          <span style={{ fontWeight: "500" }}>{status}</span>
                        </div>
                      ) : (
                        <div className="order-status-pending-wrap">
                          <div className="order-status-pending"></div>
                          {status}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="orderlist-map">
              {" "}
              {orderHistory.orders?.map((el, idx) => (
                <div
                  className="cart-item"
                  key={el.id}
                  style={{
                    padding: "10px  0  5px",
                    gridTemplateColumns: "60px 1fr auto",
                    ...(orderHistory.orders.length - 1 !== idx && {
                      borderBottom: "1px solid #e4e2d8",
                    }),
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
              ))}
            </div>

            <div className="cart-summary" style={{ marginTop: "8px" }}>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{PriceConversion(subTotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{PriceConversion(shippingCharge)}</span>
              </div>
              <div className="summary-row total">
                <span>Total paid</span>
                <span>{PriceConversion(total)}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
