import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsUser, updateUser } from "../actions/userActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import "../styles/UserEditScreen.css";

export default function UserEditScreen(props) {
  window.scrollTo(0, 0);

  const userId = props.match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push("/userlist");
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, props.history, successUpdate, user, userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
  };

  const removeCurrent = () => {
    dispatch(detailsUser());
  };

  return (
    <div className="userUpdate">
      <Link to="/userlist" onClick={removeCurrent}>
        <IoArrowBackCircle fontSize="3.5rem" width="100%" />
      </Link>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>Edit User {name}</h1>
          {loadingUpdate && <Loading></Loading>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
        </div>
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="isAdmin">Is Admin</label>
              <input
                id="isAdmin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></input>
            </div>
            <div>
              <button type="submit" className="btn__userUpdate">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
