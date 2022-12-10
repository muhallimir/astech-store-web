import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import MessageBox from "../components/MessageBox";
import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAYMENT_RESET,
} from "../constants/orderConstants";
import Loading from "../components/Loading";
import "../styles/OrderStatusScreen.css";

export default function OrderStatusScreen(props) {
  window.scrollTo(0, 0);

  const orderId = props.match.params.id;
  //   paypal 2
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  //   paypal 12
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: paymentLoading,
    error: paymentError,
    success: paymentSuccess,
  } = orderPay;

  const dispatch = useDispatch();

  //   paypal 3
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = "true";
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (
      !order ||
      paymentSuccess ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAYMENT_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, paymentSuccess, successDeliver, order]);

  // paypal 5
  const handleSuccessPayment = (paymentResult) => {
    // dispatch order payment
    dispatch(payOrder(order, paymentResult));
  };

  const handleDelivery = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="orderStatus__container">
      <h1>Order ID: {order._id}</h1>
      <div className="order__row__top">
        <div className="order__column__left">
          <>
            <>
              <div className="order__column__left--shipping">
                <h2 className="order__shipping__details--title">
                  Shipping Details
                </h2>
                <p>
                  <strong>Name: </strong>
                  {order.shippingAddress.fullName} <br />
                  <strong>Contact: </strong>
                  {order.shippingAddress.contact} <br />
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                  {/* delivery status */}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">In process</MessageBox>
                )}
              </div>
            </>

            <div className="order__payment__method">
              <p>
                <strong>Payment Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Waiting for payment</MessageBox>
              )}
            </div>

            <>
              <div className="order__order__items">
                <h2>Order Items</h2>

                {order.orderItems.map((item) => (
                  <div key={item.product}>
                    <div className="order__order__details2">
                      {/* 1st column */}
                      <div className="order__order__details--groups">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="order__order__details--image"
                        />
                      </div>
                      <div className="order__orderinfo__total">
                        {/* 2nd column */}
                        <div className="">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        {/* 3th column */}
                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          </>
        </div>
        <div className="order__column__paymentSide">
          <div className="">
            <>
              <h2>Order Summary</h2>
            </>
            <>
              <div className="row">
                <div>Items</div>
                <div>${order.itemsPrice.toFixed(2)}</div>
              </div>
            </>
            <>
              <div className="row">
                <div>Shipping</div>
                <div>${order.shippingPrice}</div>
              </div>
            </>
            <>
              <div className="row">
                <div>Tax</div>
                <div>${order.taxPrice.toFixed(2)}</div>
              </div>
            </>
            <>
              <div className="row">
                <div>
                  <strong>Order Total </strong>
                </div>
                <div>
                  <strong>${order.totalPrice.toFixed(2)}</strong>
                </div>
              </div>
            </>
            {/* Paypal 4 */}
            {!order.isPaid && (
              <div>
                {!sdkReady ? (
                  <Loading></Loading>
                ) : (
                  <div className="order__paypal__btn">
                    {paymentError && (
                      <MessageBox variant="danger">{paymentError}</MessageBox>
                    )}
                    {paymentLoading && <Loading></Loading>}
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={handleSuccessPayment}
                    ></PayPalButton>
                  </div>
                )}
              </div>
            )}
            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <div>
                {loadingDeliver && <Loading></Loading>}
                {errorDeliver && (
                  <MessageBox variant="danger">{errorDeliver}</MessageBox>
                )}
                <button
                  type="button"
                  className="order__deliver__btn"
                  onClick={handleDelivery}
                >
                  Deliver Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
