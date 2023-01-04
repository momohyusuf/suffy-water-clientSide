import React from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleSidebar } from '../../features/order/orderSlice';
import './homepageSidebar.scss';
const HomePageSidebar = () => {
  const dispatch = useDispatch();

  return (
    <aside className="homepage--sidebar--container">
      <div className="homepage--sidebar--content">
        <IoMdCloseCircle
          onClick={() => {
            dispatch(toggleSidebar(false));
          }}
          color="red"
          style={{
            cursor: 'pointer',
          }}
        />

        <p
          onClick={() => {
            dispatch(toggleSidebar(false));
          }}
        >
          <NavLink to="/login">Log in </NavLink>
          <span
            style={{
              fontSize: '0.6rem',
              color: 'red',
            }}
          >
            Admin
          </span>
        </p>
        <p
          onClick={() => {
            dispatch(toggleSidebar(false));
          }}
        >
          <NavLink to="/place-order">Place Order</NavLink>
        </p>
      </div>
    </aside>
  );
};

export default HomePageSidebar;
