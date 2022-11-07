import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { toggleModal } from "../features/order/orderSlice";

const Modal = () => {
  const { modal } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  return (
    <div className="modal--overlay">
      <div className="modal">
        <AiFillCloseCircle
          style={{
            position: "absolute",
            right: "5%",
            color: "red",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            borderRadius: "50%",
            fontSize: "1.3rem",
            cursor: "pointer",
          }}
          onClick={() =>
            dispatch(
              toggleModal({
                open: false,
                message: "",
              })
            )
          }
        />
        <p
          style={{
            fontSize: "1.4rem",
            marginTop: "0.8em",
          }}
        >
          {" "}
          {modal.message}
          <br />
          Your order ID: <strong>{modal?.orderId}</strong>
        </p>

        <IoMdCheckmarkCircle
          style={{
            fontSize: "3rem",
            color: "#006DA4",
            marginTop: "0.5em",
          }}
        />
      </div>
    </div>
  );
};

export default Modal;
