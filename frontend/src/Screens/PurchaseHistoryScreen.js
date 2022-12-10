import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrderHistory } from "../actions/orderActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import "../styles/PurchaseHistoryScreen.css";

export default function PurchaseHistoryScreen(props) {
  window.scrollTo(0, 0);

  const myPurchase = useSelector((state) => state.myPurchase);
  const { error, loading, orders } = myPurchase;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myOrderHistory());
  }, [dispatch]);

  return (
    <div className="purchaseHistory">
      <div className="purchaseHistory__Container">
        <h1 className="purchaseHistory__title">Purchase History</h1>
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
