import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { searchListProducts } from "../actions/productActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import "../styles/SearchScreen.css";

export default function SearchScreen(props) {
  window.scrollTo(0, 0);

  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
  } = useParams();

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(
      searchListProducts({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        order,
      })
    );
  }, [category, dispatch, name, min, max, rating, order]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    // return `/search/category/${filterCategory}/name/${filterName}`;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
  };

  return (
    <div className="searchItems">
      <div className="home__search">
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            <Link to="/" className="link__home">
              <h4>View All Products</h4>
            </Link>
            {products.length} Result(s) Found
            <div className="options__sort">
              Sort by{" "}
              <select
                className="sort__select"
                value={order}
                onChange={(e) => {
                  props.history.push(getFilterUrl({ order: e.target.value }));
                }}
              >
                <option value="newest">Newest First</option>
                <option value="lowest">Price: Low to High</option>
                <option value="highest">Price: High to Low</option>
                <option value="toprated">Top rated items</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="row__center__search">
        <div className="product__results">
          {loading ? (
            <Loading></Loading>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="product__results__items">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
