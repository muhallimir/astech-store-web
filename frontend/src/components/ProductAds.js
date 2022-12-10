import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/ProductAds.css";
import Rating from "./Rating";

function ProductAds(props) {
  const { product } = props;

  const history = useHistory();
  const handleClick = () => history.push(`/product/${product._id}`);

  return (
    <div key={product._id} className="productAds__home">
      <Link to={`/product/${product._id}`} className="productAds__link">
        <div className="productAds__home-body">
          <h4>{product.name}</h4>
          <p className="product__price">
            <small>$</small>
            <strong>{product.price}</strong>
          </p>
          <div className="productAds__rating">
            <Rating
              className="productAds__rating"
              rating={product.rating}
              numReviews={product.numReviews}
            ></Rating>
          </div>
        </div>
      </Link>

      <img
        src={product.image}
        alt=""
        className="productAds__image"
        onClick={handleClick}
      />
    </div>
  );
}

export default ProductAds;
