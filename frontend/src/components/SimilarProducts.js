import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchListProducts } from "../actions/productActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import "../styles/SimilarProducts.css";
import ProductAds from "./ProductAds";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const SimilarProducts = () => {
  const productDetails = useSelector((state) => state.productDetails);
  const { id } = useParams();
  const { product } = productDetails;
  const { category } = product;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;

  const sideScroll = (
    element: HTMLDivElement,
    speed: number,
    distance: number,
    step: number
  ) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };

  const contentWrapper = React.useRef(null);

  useEffect(() => {
    dispatch(
      searchListProducts({
        category: category,
        exclude: id,
      })
    );
  }, [category, dispatch, id]);

  return (
    <div className="similarProducts">
      <h3>Similar Items</h3>
      <i
        onClick={() => {
          sideScroll(contentWrapper.current, 20, 100, -15);
        }}
      >
        <AiFillCaretLeft />
      </i>
      <i
        onClick={() => {
          sideScroll(contentWrapper.current, 20, 100, 15);
        }}
      >
        <AiFillCaretRight />
      </i>
      <div className="similarProducts__items" ref={contentWrapper}>
        {loadingProducts ? (
          <Loading></Loading>
        ) : errorProducts ? (
          <MessageBox variant="danger">{errorProducts}</MessageBox>
        ) : (
          products
            .filter((product) => product._id !== id)
            .map((product) => (
              <ProductAds key={product._id} product={product}></ProductAds>
            ))
        )}
      </div>
    </div>
  );
};

export default SimilarProducts;
