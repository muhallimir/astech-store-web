import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";
import "../styles/ProductListScreen.css";

export default function ProductListScreen(props) {
  window.scrollTo(0, 0);
  // admin list product 2
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successProductUpdate } = productUpdate;

  const dispatch = useDispatch();

  //   delete product
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const deleteHandler = (product) => {
    /// delete action
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product._id));
    }
  };

  const handleCreate = () => {
    dispatch(createProduct());
  };

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts());
  }, [dispatch, createdProduct, props.history, successCreate, successDelete]);

  return (
    <div className="productList">
      <div className="productList__Container">
        <h1 className="purchaseHistory__title">Products</h1>
        {successProductUpdate && (
          <MessageBox variant="success">
            Product Updated Successfully!
            <Link to="/productlist"> View Products</Link>
          </MessageBox>
        )}
      </div>
      {loadingCreate && <Loading></Loading>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button type="button" className="addnew__btn" onClick={handleCreate}>
        Add new product
      </button>
    </div>
  );
}
