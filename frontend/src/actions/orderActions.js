import Axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import {
  ORDER_CREATE_FAILED,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAILED,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVER_FAILED,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAILED,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAILED,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAYMENT_FAILED,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_SUCCESS,
  PURCHASE_HISTORY_FAILED,
  PURCHASE_HISTORY_REQUEST,
  PURCHASE_HISTORY_SUCCESS,
  ORDER_SUMMARY_REQUEST,
  ORDER_SUMMARY_SUCCESS,
  ORDER_SUMMARY_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    // ajax request
    const { data } = await Axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    // remove all items from cart
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    // ajax request
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: ORDER_DETAILS_FAILED, payload: message });
  }
};

// paypal 9
export const payOrder =
  (order, paymentResult) => async (dispatch, getState) => {
    dispatch({
      type: ORDER_PAYMENT_REQUEST,
      payload: { order, paymentResult },
    });
    const {
      userSignin: { userInfo },
    } = getState();

    try {
      const { data } = Axios.put(
        `/api/orders/${order._id}/pay`,
        paymentResult,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: ORDER_PAYMENT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_PAYMENT_FAILED, payload: message });
    }
  };

export const myOrderHistory = () => async (dispatch, getState) => {
  dispatch({ type: PURCHASE_HISTORY_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/orders/purchase", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: PURCHASE_HISTORY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PURCHASE_HISTORY_FAILED, payload: message });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/orders", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_LIST_FAILED, payload: message });
  }
};

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELETE_FAILED, payload: message });
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELIVER_FAILED, payload: message });
  }
};

// for dashboard
export const summaryOrder = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_SUMMARY_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get("/api/orders/summary", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_SUMMARY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_SUMMARY_FAIL, payload: message });
  }
};
