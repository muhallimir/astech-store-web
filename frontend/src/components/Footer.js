import React from "react";
import { useSelector } from "react-redux";
import "../styles/Footer.css";
import ChatBox from "./Chatbox";
import Logo from "./Logo.png";

function Footer() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <div className="footer__container">
      <div className="footer__links">
        <div className="footer__links--wrapper">
          <div className="footer__links--items">
            <h2>About Us</h2>
            <a href="/">Blog</a>
            <a href="/">About Astech</a>
            <a href="/">Investors Relations</a>
            <a href="/">Astech Devices</a>
            <a href="/">Terms of Services</a>
          </div>

          <div class="footer__links--items">
            <h2>Contact Us</h2>
            <a href="/">Contact</a>
            <a href="/">Destination</a>
            <a href="/">Support</a>
            <a href="/">Sponsorship</a>
          </div>
        </div>
        <div class="footer__links--wrapper">
          <div class="footer__links--items">
            <h2>Videos</h2>
            <a href="/">Submit Video</a>
            <a href="/">Ambassador</a>
            <a href="/">Agency</a>
            <a href="/">Influencer</a>
          </div>
          <div class="footer__links--items">
            <h2>Social Media</h2>
            <a href="/">Facebook</a>
            <a href="/">Youtube</a>
            <a href="/">Instagram</a>
            <a href="/">Twitter</a>
          </div>
        </div>
      </div>
      <div class="social__media">
        <div class="social__media--wrap">
          <div class="footer__logo">
            <img className="header__logo" src={Logo} alt="text" />
          </div>
          <p class="website__rights">ASTECH 2021. All rights reserved™</p>
          <div class="social__icons">
            <a href="/" className="social__icons--links" target="_blank">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="/" className="social__icons--links" target="_blank">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="/" className="social__icons--links" target="_blank">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="/" className="social__icons--links" target="_blank">
              <i className="fa fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="social__media">
        {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
      </div>
    </div>
  );
}

export default Footer;
