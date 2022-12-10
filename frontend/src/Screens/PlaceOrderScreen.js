import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import { detailsUser } from "../actions/userActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import OrderShipping from "../components/OrderShipping";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import "../styles/PlaceOrderScreen.css";

export default function PlaceOrderScreen(props) {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(detailsUser(userInfo._id));
    } else {
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  console.log("User is >>>", user);

  const cart = useSelector((state) => state.cart);

  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  // total price conversion to currency format e.g: 2.123 => "2.12" => 2.12
  const curPrice = (num) => Number(num.toFixed(2));

  //   a = accumulator c = current price
  cart.itemsPrice = curPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? curPrice(0) : curPrice(10);
  cart.taxPrice = curPrice(0.15 * cart.itemsPrice);

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const handlePlaceOrder = () => {
    // dispatch place order action
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <div className="placeOrder__container">
      <OrderShipping step1 step2 step3 step4></OrderShipping>
      <div className="row__top">
        <div className="column__left">
          <ul>
            <div className="column__left--shipping">
              <h2 className="shipping__details--title">Shipping Details</h2>
              <p>
                <strong>Name: </strong>
                {cart.shippingAddress.fullName} <br />
                <strong>Contact: </strong>
                {cart.shippingAddress.contact} <br />
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div className="payment__method">
              <p>
                <strong>Payment Method: </strong>
                {cart.paymentMethod}
              </p>
            </div>

            <div className="order__items">
              <h2>Order Items</h2>
              <div>
                {cart.cartItems.map((item) => (
                  <div key={item.product}>
                    <div className="order__details">
                      <div className="order__details--groups">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="order__details--image"
                        />
                      </div>
                      <div className="">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ul>
        </div>
        <div className="column__right">
          <div className="">
            <h2>Order Summary</h2>

            <div className="row">
              <div>Items</div>
              <div>${cart.itemsPrice.toFixed(2)}</div>
            </div>

            <div className="row">
              <div>Shipping</div>
              <div>${cart.shippingPrice}</div>
            </div>

            <div className="row">
              <div>Tax</div>
              <div>${cart.taxPrice.toFixed(2)}</div>
            </div>

            <div className="row">
              <div>
                <strong>Order Total </strong>
              </div>
              <div>
                <strong>${cart.totalPrice.toFixed(2)}</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              className="placeorder__btn"
              disabled={cart.cartItems.length === 0}
            >
              Place Order
            </button>

            {loading && <Loading></Loading>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </div>
        </div>
      </div>
    </div>
  );
}
