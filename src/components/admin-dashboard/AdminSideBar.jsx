import React from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleOrderStatus,
  toggleShowSearchOrderById,
  updateSingleOrder,
} from "../../features/order/orderSlice";
import { FiLogOut } from "react-icons/fi";
import { useLogoutMutation } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

const statusFilter = ["pending", "fulfilled", "cancelled"];
const AdminSideBar = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.admin);
  const { orderStatus } = useSelector((state) => state.order);
  const [logoutMutation] = useLogoutMutation();
  const navigate = useNavigate();
  const logoutAdmin = async () => {
    const response = await logoutMutation();
    if (response.data.message === "logout successful") {
      navigate("/");
    } else {
      console.log("Error ocurred");
    }
  };
  return (
    <div className="admin--sidebar">
      <div className="admin--sidebar--header">
        <p
          style={{
            // color: "#F2542D",
            fontWeight: "600",
            textTransform: "capitalize",
          }}
        >
          <FaRegUser /> Hello {admin?.user?.name}
        </p>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            margin: "1em 0em",
            borderBottom: "1px solid grey",
          }}
        >
          {" "}
          <AiFillClockCircle /> {new Date().toLocaleTimeString()}
        </p>
      </div>
      <p>Find order</p>
      <ul>
        <li
          onClick={() => {
            dispatch(toggleShowSearchOrderById(true));
          }}
        >
          Search by Order ID
        </li>
      </ul>
      {/* ++++++++++++++++ */}
      <p>Filter orders by status</p>

      <ul>
        <li
          onClick={(e) => {
            dispatch(
              updateSingleOrder({
                isShow: false,
                order: "",
              })
            );
            dispatch(toggleShowSearchOrderById(false));
            dispatch(toggleOrderStatus(""));
          }}
          id={`${orderStatus === "" && "active"}`}
        >
          All orders
        </li>
        {statusFilter.map((item, index) => (
          <li
            onClick={(e) => {
              dispatch(
                updateSingleOrder({
                  isShow: false,
                  order: null,
                })
              );
              dispatch(toggleShowSearchOrderById(false));
              dispatch(toggleOrderStatus(e.target.innerText));
            }}
            key={index}
            id={`${item === orderStatus.toLowerCase() ? "active" : ""}`}
          >
            {item}
          </li>
        ))}
      </ul>
      <p
        style={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          bottom: "70px",
          cursor: "pointer",
        }}
        onClick={logoutAdmin}
        className="logout"
      >
        {" "}
        <span
          style={{
            marginRight: "0.5em",
          }}
        >
          Logout
        </span>{" "}
        <FiLogOut />
      </p>
    </div>
  );
};

export default AdminSideBar;
