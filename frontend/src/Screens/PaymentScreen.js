import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import OrderShipping from "../components/OrderShipping";
import "../styles/PaymentScreen.css";

export default function PaymentScreen(props) {
  window.scrollTo(0, 0);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const dispatch = useDispatch("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <div className="payment__container">
      <OrderShipping step1 step2 step3></OrderShipping>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              className="radio__input"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <button className="btn__continue" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}
