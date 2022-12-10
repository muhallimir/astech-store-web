import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import "../styles/Chatbox.css";
import LiveChat from "../assets/livechat.gif";

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:5000"
    : window.location.host;

export default function ChatBox(props) {
  const { userInfo } = props;
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([
    { name: "Admin", body: "Hi! Please input your inquiry." },
  ]);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    if (socket) {
      socket.emit("onLogin", {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      socket.on("message", (data) => {
        setMessages([...messages, { body: data.body, name: data.name }]);
      });
    }
  }, [messages, isOpen, socket]);

  const supportHandler = () => {
    setIsOpen(true);
    console.log(ENDPOINT);
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Error. Please type message.");
    } else {
      setMessages([...messages, { body: messageBody, name: userInfo.name }]);
      setMessageBody("");
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
          _id: userInfo._id,
        });
      }, 1000);
    }
  };
  const closeHandler = () => {
    setIsOpen(false);
  };
  return (
    <div className="chatbox">
      {!isOpen ? (
        <div type="button" onClick={supportHandler}>
          <img src={LiveChat} alt="livechat" />
        </div>
      ) : (
        <div className="chatbox__body">
          <div className="chatbox__body-row">
            <div className="chatbox__title">
              <strong>Customer Support </strong>
            </div>
            <div className="chatbox__close">
              <button type="button" onClick={closeHandler}>
                <i className="fa fa-close" />
              </button>
            </div>
          </div>

          <ul ref={uiMessagesRef}>
            {messages.map((msg, index) => (
              <li key={index}>
                <strong>{`${msg.name}: `}</strong> {msg.body}
              </li>
            ))}
          </ul>
          <div>
            <form onSubmit={submitHandler} className="chatbox__form">
              <input
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                type="text"
                placeholder="type message"
              />

              <button type="submit">
                <i className="fa fa-paper-plane" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
