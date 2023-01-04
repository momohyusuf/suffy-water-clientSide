import React from 'react';

import { HiOutlineBars3 } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../features/order/orderSlice';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/suffy-logo.png';
import './homeNav.scss';

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className="home--nav">
      <div className="nav--items">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" width="60px" />
            {/* <div>
              <h1>Suffy's</h1>
              <p>Water</p>
            </div> */}
          </Link>
        </div>
        <div>
          {' '}
          <HiOutlineBars3
            onClick={() => {
              dispatch(toggleSidebar(true));
            }}
            color="#006da4"
            style={{
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
