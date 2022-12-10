import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import OrderShipping from "../components/OrderShipping";
import "../styles/ShippingAddressScreen.css";

export default function ShippingAddressScreen(props) {
  window.scrollTo(0, 0);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [contact, setContact] = useState(shippingAddress.contact);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if (!newLat || !newLng) {
      moveOn = window.confirm(
        "You did not set your location on map. Continue?"
      );
    }

    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          contact,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        })
      );
      props.history.push("/payment");
    }
  };

  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        fullName,
        contact,
        address,
        city,
        postalCode,
        country,
        lat,
        lng,
      })
    );
    props.history.push("/map");
  };

  return (
    <div className="shipping__container">
      <OrderShipping step1 step2></OrderShipping>
      <form className="form__shipping" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="contact">Contact no.</label>
          <input
            type="text"
            id="contact"
            placeholder="Enter contact no."
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          ></input>
        </div>
        <div className="container__Address">
          <div className="containerAddress__label">
            <label htmlFor="address">Complete Address</label>
          </div>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={addressMap ? addressMap.address : address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="chooseOnMap">Location</label>
          <button type="button" onClick={chooseOnMap}>
            Choose On Map
          </button>
        </div>
        <div>
          <label />
          <button className="btn__cont" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
