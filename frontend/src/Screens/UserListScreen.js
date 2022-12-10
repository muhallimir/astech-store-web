import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import "../styles/UserListScreen.css";

export default function UserListScreen(props) {
  window.scrollTo(0, 0);

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch]);

  return (
    <div className="user__list">
      <div className="user__list--container">
        <h1 className="user__list--title">Users</h1>
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>IS ADMIN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "YES" : "NO"}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/user/${user._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
