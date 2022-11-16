import React from "react";
import { Link } from "react-router-dom";

const CustomBtn = () => {
  return (
    <button className="custom--btn">
      <Link to="/place-order">Place Order</Link>
    </button>
  );
};

export default CustomBtn;
