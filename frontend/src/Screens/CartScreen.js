import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import CheckoutProduct from "../components/CheckoutProduct";
import Subtotal from "../components/Subtotal";
import "../styles/CartScreen.css";

export default function CartScreen(props) {
  window.scrollTo(0, 0);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const productId = props.match.params.id;

  // getting qty from url
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://links.papareact.com/ikj"
          alt=""
        />

        <div>
          <h3>Hello, {userInfo?.name}</h3>
          {cartItems.length === 0 ? (
            <h2 className="checkout__title">Your cart is empty</h2>
          ) : (
            <h2 className="checkout__title">Your cart item(s)</h2>
          )}

          {cartItems.map((item) => (
            <div>
              <CheckoutProduct
                id={item._id}
                product={item.product}
                name={item.name}
                image={item.image}
                qty={item.qty}
                countInStock={item.countInStock}
                price={item.price}
                rating={item.rating}
                numReviews={item.numReviews}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}
