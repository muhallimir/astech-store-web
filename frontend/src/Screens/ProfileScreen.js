import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import "../styles/ProfileScreen.css";

export default function ProfileScreen() {
  window.scrollTo(0, 0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert("Password and confirm password did not match");
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
  };

  return (
    <div className="profile__container">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>Your Profile</h1>
        </div>
        <div></div>
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <Loading></Loading>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully!
                <Link to="/"> Start Shopping</Link>
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter new password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <button className="btn__update" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
