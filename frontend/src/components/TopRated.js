import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchListProducts } from "../actions/productActions";
import "../styles/TopRated.css";
import Loading from "./Loading";
import MessageBox from "./MessageBox";
import ProductAds from "./ProductAds";

const TopRated = () => {
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

  useEffect(() => {
    dispatch(
      searchListProducts({
        category: category,
        exclude: id,
      })
    );
  }, [category, dispatch, id]);

  return (
    <div className="topRated">
      <h4>Other Top Rated Items</h4>
      <div className="topRatedContent">
        {loadingProducts ? (
          <Loading></Loading>
        ) : errorProducts ? (
          <MessageBox variant="danger">{errorProducts}</MessageBox>
        ) : (
          products
            .filter((product) => product._id !== id)
            .sort((a, b) => {
              return b.rating - a.rating;
            })
            .map((product) => {
              return <ProductAds key={product.id} product={product} />;
            })
        )}
      </div>
    </div>
  );
};

export default TopRated;
