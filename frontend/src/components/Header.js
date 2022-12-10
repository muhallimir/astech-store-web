import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import { Link, useParams } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Logo from "./Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
import { BrowserRouter, Route } from "react-router-dom";
import SearchBox from "./Searchbox";
import { listProductCategories } from "../actions/productActions";
import Loading from "./Loading";
import MessageBox from "./MessageBox";
import { prices, ratings } from "../utils";
import RatingSide from "./RatingSide";

function Header(props) {
  // getting the  cart info
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // getting the user info
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  // product category lists
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
  } = useParams();

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(
      listProductCategories({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        order,
      })
    );
  }, [category, dispatch, name, min, max, rating, order]);

  const handleSignOut = () => {
    dispatch(signout());
  };

  // Get filter method
  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
  };

  return (
    <div className="navbar__container">
      <div className="header__logo--mobile--container">
        <BrowserRouter>
          <div className="mobile__search">
            <button
              type="button"
              className="mobile-open-sidebar"
              onClick={() => setSidebarOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
        </BrowserRouter>
      </div>
      <div className="header">
        <Link to="/">
          <img className="header__logo" src={Logo} alt="text" />
        </Link>
        <button
          type="button"
          className="open-sidebar"
          onClick={() => setSidebarOpen(true)}
        >
          <i className="fa fa-bars"></i>
        </button>
        <BrowserRouter>
          <div className="desktop__search">
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
        </BrowserRouter>

        <div className="header__nav">
          {/* conditional signin button */}
          {userInfo ? (
            <div className="dropdown">
              <Link to="#" className="link">
                <div className="header__option">
                  <span className="header__optionLineOne">Hello,</span>
                  <span className="header__optionLineTwo">
                    {userInfo.name}
                    {""} <i className="fa fa-caret-down"></i>
                  </span>
                </div>
              </Link>
              <ul className="dropdown-content">
                <Link
                  to="#signout"
                  onClick={handleSignOut}
                  className="list__link"
                >
                  Sign out
                </Link>
                {/* </li> */}
              </ul>
            </div>
          ) : (
            <Link to="/signin" className="link">
              <div className="header__option">
                <span className="header__optionLineOne">Hello Guest,</span>
                <span className="header__optionLineTwo">Signin</span>
              </div>
            </Link>
          )}
          <Link to="/profile" className="link">
            <div className="header__option">
              <span className="header__optionLineOne">Manage</span>
              <span className="header__optionLineTwo">Profile</span>
            </div>
          </Link>

          {/* admin 1 */}
          {userInfo && userInfo.isAdmin ? (
            <div className="dropdown">
              <Link to="#admin" className="link">
                <div className="header__option">
                  <span className="header__optionLineOne">Admin</span>
                  <span className="header__optionLineTwo">
                    Access <i className="fa fa-caret-down"></i>
                  </span>
                </div>
              </Link>
              <div className="dropdown-content">
                <Link to="/dashboard" className="list__link">
                  Dashboard
                </Link>
                <Link to="/productlist" className="list__link">
                  Products
                </Link>
                <Link to="/orderlist" className="list__link">
                  Orders
                </Link>
                <Link to="/userlist" className="list__link">
                  Users
                </Link>
                <Link to="/support" className="list__link">
                  Support
                </Link>
              </div>
            </div>
          ) : userInfo ? (
            <Link to="/purchasehistory" className="link">
              <div className="header__option">
                <span className="header__optionLineOne">Purchase</span>
                <span className="header__optionLineTwo">History</span>
              </div>
            </Link>
          ) : (
            <Link to="/signin" className="link">
              <div className="header__option">
                <span className="header__optionLineOne">Purchase</span>
                <span className="header__optionLineTwo">History</span>
              </div>
            </Link>
          )}

          <Link to="/cart" className="link">
            <div className="header__optionBasket">
              <ShoppingCartIcon style={{ fontSize: 25 }} />

              {cartItems.length > 0 && (
                <span className="header__basketCount">{cartItems.length}</span>
              )}
            </div>
          </Link>
        </div>
      </div>
      <aside className={sidebarOpen ? "open" : ""}>
        <ul className="categories">
          <li>
            <Link to="/" className="link__all">
              <h4>Home</h4>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="close-sidebar"
              type="button"
            >
              <i className="fa  fa-close"></i>
            </button>
          </li>
          <li>
            <strong>Categories</strong>
          </li>
          {loadingCategories ? (
            <Loading></Loading>
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            categories.map((c) => (
              <li key={c}>
                <Link
                  className="catList"
                  to={`/search/category/${c}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {c}
                </Link>
              </li>
            ))
          )}
          <br />
          <li>
            <strong>Price</strong>
          </li>
          {prices.map((p) => (
            <li key={p.name}>
              <Link
                // remove text decoration
                style={{ textDecoration: "none", color: "white" }}
                className={p === category ? "catList" : ""}
                to={getFilterUrl({ category: p })}
                to={getFilterUrl({ min: p.min, max: p.max })}
                className={
                  `${p.min}-${p.max}` === `${min}-${max}` ? "catList" : ""
                }
                onClick={() => setSidebarOpen(false)}
              >
                {p.name}
              </Link>
            </li>
          ))}
          <br />
          <li>
            <strong>Average Customer Reviews</strong>
          </li>
          {ratings.map((r) => (
            <li key={r.name}>
              <Link
                to={getFilterUrl({ rating: r.rating })}
                className={`${r.rating}` === `${rating}` ? "catList" : ""}
                onClick={() => setSidebarOpen(false)}
              >
                <RatingSide caption={"and up"} rating={r.rating}></RatingSide>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default Header;
