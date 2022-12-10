import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import "../styles/SigninScreen.css";

export default function SigninScreen(props) {
  window.scrollTo(0, 0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  //   redirect to shipping page
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="login__container">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <Loading></Loading>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="btn__signin" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer?{" "}
            <Link to={`/register?redirect=${redirect}`}>
              Create your account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
