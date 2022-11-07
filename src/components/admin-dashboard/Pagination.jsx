import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { updatePage } from "../../features/order/orderSlice";

const Pagination = () => {
  const { orders, page } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  let items = [];

  for (let i = 1; i <= orders?.numberOfPages; i++) {
    items.push(i);
  }

  const nextPage = () => {
    if (Number(page) < orders?.numberOfPages) {
      dispatch(updatePage(Number(page) + 1));
    }
  };

  const prevPage = () => {
    if (Number(page) > 1) {
      dispatch(updatePage(Number(page) - 1));
    }
  };

  return (
    <div
      style={{
        margin: "3rem 0",
      }}
    >
      <ul>
        <li>
          <BsFillArrowLeftSquareFill onClick={prevPage} />
        </li>
        {items.map((orderPage, index) => (
          <li
            onClick={(e) => {
              dispatch(updatePage(e.target.textContent));
            }}
            key={index}
            className={`${
              orderPage.toString() === Number(page) ? "selected" : ""
            }`}
          >
            {orderPage}
          </li>
        ))}
        <li>
          <BsFillArrowRightSquareFill onClick={nextPage} />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
