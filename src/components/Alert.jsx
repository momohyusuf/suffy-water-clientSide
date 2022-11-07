import React from "react";
import { useSelector } from "react-redux";
import { BsExclamationLg } from "react-icons/bs";

const Alert = () => {
  const { alert } = useSelector((state) => state.order);
  return (
    <section className="alert--container">
      <div
        className="alert--box"
        style={{
          display: "flex",
        }}
      >
        {" "}
        <BsExclamationLg color="red" />
        <p>{alert.message}</p>
      </div>
    </section>
  );
};

export default Alert;
