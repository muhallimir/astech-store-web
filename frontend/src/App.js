import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./Screens/HomeScreen";
import Footer from "./components/Footer";
import ProductScreen from "./Screens/ProductScreen";
import SigninScreen from "./Screens/SigninScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import CartScreen from "./Screens/CartScreen";
import ShippingAddressScreen from "./Screens/ShippingAddressScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderStatusScreen from "./Screens/OrderStatusScreen";
import CustomerRoute from "./components/CustomerRoute";
import ProfileScreen from "./Screens/ProfileScreen";
import PurchaseHistoryScreen from "./Screens/PurchaseHistoryScreen";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./Screens/ProductListScreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import OrderListScreen from "./Screens/OrderListScreen";
import UserListScreen from "./Screens/UserListScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import SearchScreen from "./Screens/SearchScreen";
import MapScreen from "./Screens/MapScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import SupportScreen from "./Screens/SupportScreen";

function App() {
  window.scrollTo(0, 0);

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <CustomerRoute
            exact
            path="/profile"
            component={ProfileScreen}
          ></CustomerRoute>
          <CustomerRoute
            path="/map"
            component={MapScreen}
            exact
          ></CustomerRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
          ></AdminRoute>
          <AdminRoute
            path="/dashboard"
            component={DashboardScreen}
          ></AdminRoute>
          <AdminRoute path="/support" component={SupportScreen}></AdminRoute>
          <Route
            path="/purchasehistory"
            component={PurchaseHistoryScreen}
            exact
          ></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/order/:id" component={OrderStatusScreen} exact></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/payment" component={PaymentScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route exact path="/" component={HomeScreen}></Route>
          <Route exact path="/product/:id" component={ProductScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
            component={SearchScreen}
            exact
          ></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
