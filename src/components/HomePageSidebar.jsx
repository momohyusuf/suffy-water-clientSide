import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSidebar } from "../features/order/orderSlice";

const HomePageSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <aside className="homepage--sidebar--container">
      <div className="homepage--sidebar--content">
        <IoMdCloseCircle
          onClick={() => {
            dispatch(toggleSidebar(false));
          }}
        />

        <p
          onClick={() => {
            dispatch(toggleSidebar(false));
            navigate("/login");
          }}
        >
          Login{" "}
          <span
            style={{
              fontSize: "0.6rem",
              color: "red",
            }}
          >
            Admin
          </span>
        </p>
        <p
          onClick={() => {
            dispatch(toggleSidebar(false));
            navigate("/place-order");
          }}
        >
          Place Order
        </p>
      </div>
    </aside>
  );
};

export default HomePageSidebar;
