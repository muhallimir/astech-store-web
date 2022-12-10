import React from "react";
import "../styles/Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function Subtotal(props) {
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleCheckout = () => {
    // if no user is logged in, route them to signin page
    history.push("/signin?redirect=shipping");
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={() => (
          <>
            <p>
              Subtotal ({cartItems?.reduce((a, c) => a + c.qty, 0)} items) : $
              {cartItems?.reduce((a, c) => a + c.price * c.qty, 0)}
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button
        type="button"
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
      >
        Proceed to checkout
      </button>
    </div>
  );
}

export default Subtotal;
//
