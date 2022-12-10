import React, { useEffect, useState } from "react";
import "../styles/ProductScreen.css";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { IoArrowBackCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { createReview, detailsProduct } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";
import SimilarProducts from "../components/SimilarProducts";
import TopRated from "../components/TopRated";

function ProductScreen(props) {
  // window.scrollTo(0, 0);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Please enter comment and rating");
    }
  };

  const handleAddtoCart = () => {
    dispatch(addToCart(product._id, qty));
  };

  const handleBuyNow = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
    dispatch(addToCart(productId));
    dispatch(addToCart(product._id, qty));
  };

  return (
    <div className="product__screen">
      <Link to="/">
        <IoArrowBackCircle className="back__icon" />
      </Link>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="container">
          <div className="container__productDetails">
            <img
              className="product-img"
              src={product.image}
              alt={product.name}
            ></img>
            <div className="product__details">
              <ul>
                <h1>{product.name}</h1>
                <br />
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
                <strong>
                  <p>Price : ${product.price}</p>
                </strong>
                Description: <p>{product.description}</p>
              </ul>
            </div>
            <div className="product__options">
              <div className="options">
                <div>Price</div>
                <div className="price">${product.price}</div>
                <br />
                <div className="options_cart">
                  <div>Availability : </div>
                  <div>
                    <strong>
                      {product.countInStock > 0 ? (
                        <span className="inStock">In stock</span>
                      ) : (
                        <span className="noStock">Out of Stock</span>
                      )}
                    </strong>
                  </div>
                </div>

                {/* button enabled or disabled based on product availability */}
                {product.countInStock > 0 && (
                  <>
                    <div className="options_cart">
                      <div>Quantity</div>
                      <div>
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={handleBuyNow}
                      disabled={product.countInStock === 0}
                      className="basket__button1"
                    >
                      Buy now
                    </button>
                    <button
                      onClick={handleAddtoCart}
                      className="basket__button2"
                    >
                      Add to Cart
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="product__topRated">
            <TopRated />
          </div>
          {/* similar products */}
          <div className="product__similar">
            <SimilarProducts />
          </div>

          {/* Review Section*/}
          <div className="product__reviews">
            <h2 id="review">Reviews</h2>
            {product.reviews.length === 0 && (
              <div className="show__Reviews-err1">
                <MessageBox>There is no review</MessageBox>
              </div>
            )}
            <ul>
              {product.reviews.map((review) => (
                <div key={review._id} className="review__lists">
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </div>
              ))}
              <>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Leave a review</h2>
                    </div>
                    <div className="form__body">
                      <label htmlFor="rating">
                        <strong>Rating</strong>
                      </label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excellent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    <li>
                      {loadingReviewCreate && <Loading></Loading>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </li>
                  </form>
                ) : (
                  <div className="show__Reviews-err2">
                    <MessageBox variant="danger">
                      <Link to="/signin">Sign In</Link> to write a review
                    </MessageBox>
                  </div>
                )}
              </>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
