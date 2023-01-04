import React from 'react';
import './admin-navbar.scss';
import { FaUserAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../../assets/images/suffy-logo.png';
const AdminNavbar = () => {
  const { admin } = useSelector((state) => state.admin);
  const createDateString = () => {
    const date = new Date(Date.now());
    const dateString = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const timeString = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return `${dateString} ${timeString}`;
  };
  return (
    <nav className="admin--page--nav">
      <div className="logo">
        <img src={logo} alt="logo" width="60px" />
      </div>
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <h2>{admin?.user?.location.toUpperCase()}</h2>
        <p>{createDateString()}</p>
      </div>
      <div>
        <FaUserAlt />
        <span
          style={{
            marginLeft: '0.5rem',
          }}
        >
          {admin?.user.name}
        </span>
      </div>
    </nav>
  );
};

export default AdminNavbar;
