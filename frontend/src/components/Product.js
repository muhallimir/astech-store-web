import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import "../styles/Product.css";
import Rating from "./Rating";

function Product(props) {
  const { product } = props;

  const dispatch = useDispatch();
  const productId = product.id;
  const history = useHistory();
  const handleClick = () => {
    history.push(`/product/${product._id}`);
    window.scrollTo(0, 0);
  };

  const [qty] = useState(1);

  const handleAddtoCart = () => {
    dispatch(addToCart(product._id, qty));
  };

  const handleBuyNow = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
    dispatch(addToCart(productId));
    dispatch(addToCart(product._id, qty));
  };

  return (
    <div key={product._id} className="card__home">
      <Link to={`/product/${product._id}`} className="product__link">
        <div className="card__home-body">
          <h4>{product.name}</h4>

          <p className="product__price">
            <small>$</small>
            <strong>{product.price}</strong>
          </p>
          <div className="product__rating">
            <Rating
              rating={product.rating}
              numReviews={product.numReviews}
            ></Rating>
          </div>
        </div>
      </Link>

      <img
        src={product.image}
        alt=""
        className="home__image"
        onClick={handleClick}
      />
      <div className="btn__container">
        <button
          onClick={handleBuyNow}
          disabled={product.countInStock === 0}
          className="item__btn1"
        >
          Buy now
        </button>

        <button
          onClick={handleAddtoCart}
          disabled={product.countInStock === 0}
          className="item__btn2"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Product;
