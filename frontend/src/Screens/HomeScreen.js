import React, { useEffect } from "react";
import "../styles/HomeScreen.css";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import MainCarousel from "../components/MainCarousel";

function HomeScreen() {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  // eslint-disable-next-line no-unused-vars
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <MainCarousel />
      <div className="home">
        <div>
          {loading ? (
            <Loading></Loading>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div>
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
