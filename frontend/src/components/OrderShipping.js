import React from "react";
import "../styles/OrderShipping.css";
export default function OrderShipping(props) {
  return (
    <div className="order__shipping">
      <div className="check__ship checkout-steps">
        <div className={props.step1 ? "active" : ""}>Order</div>
        <div className={props.step2 ? "active" : ""}>Shipping</div>
        <div className={props.step3 ? "active" : ""}>Payment</div>
        <div className={props.step4 ? "active" : ""}>Checkout</div>
      </div>
    </div>
  );
}
