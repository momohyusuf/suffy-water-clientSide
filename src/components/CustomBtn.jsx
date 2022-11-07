import React from "react";
import { Link } from "react-router-dom";

const CustomBtn = () => {
  return (
    <div className="custom--btn--container">
      <button className="custom--btn">
        <Link to="/place-order">Place Order</Link>
      </button>
    </div>
  );
};

export default CustomBtn;
