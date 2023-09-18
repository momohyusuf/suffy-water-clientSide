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
          <NavLink to="/sign-in">Sign In </NavLink>
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
