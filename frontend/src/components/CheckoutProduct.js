import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import "../styles/CheckoutProduct.css";

function CheckoutProduct({
  id,
  name,
  image,
  price,
  qty,
  countInStock,
  product,
  rating,
  numReviews,
}) {
  const dispatch = useDispatch();

  const productId = id;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromBasket = () => {
    //   remove item
    dispatch(removeFromCart(product));
  };

  return (
    <div className="checkoutProduct">
      <Link to={`/product/${product}`} className="product__link">
        <img className="checkoutProduct__image" src={image} alt="text" />
      </Link>
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{name}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div>
          <select
            className="checkoutProduct__qty"
            value={qty}
            onChange={(e) =>
              dispatch(addToCart(product, Number(e.target.value)))
            }
          >
            {[...Array(countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>
        <button onClick={removeFromBasket}>Remove Item</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
