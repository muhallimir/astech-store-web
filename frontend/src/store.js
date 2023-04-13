import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import {
  myPurchaseReducer,
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
  orderSummaryReducer,
} from "./reducers/orderReducer";
import {
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
  productReviewCreateReducer,
} from "./reducers/productReducer";
import {
  userAddressMapReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducer";
import { micrositeReducer } from "./reducers/micrositeReducer";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
  micrositeAccess: false,
};

const reducer = combineReducers({
  productDetails: productDetailsReducer,
  productList: productListReducer,
  productCategoryList: productCategoryListReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myPurchase: myPurchaseReducer,
  userDetails: userDetailsReducer,
  userAddressMap: userAddressMapReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productReviewCreate: productReviewCreateReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderSummary: orderSummaryReducer,
  micrositeAccess: micrositeReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
