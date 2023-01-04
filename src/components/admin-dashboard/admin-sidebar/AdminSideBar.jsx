import React from 'react';
import { AiFillClockCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleOrderStatus,
  toggleShowSearchOrderById,
  updateSingleOrder,
  updatePage,
  toggleOrderAlert,
} from '../../../features/order/orderSlice';
import { FiLogOut } from 'react-icons/fi';
import { useLogoutMutation } from '../../../services/authApi';
import { useNavigate } from 'react-router-dom';

import { BsSearch, BsFillFilterSquareFill } from 'react-icons/bs';
import {
  MdOutlinePendingActions,
  MdOutlineCancelPresentation,
} from 'react-icons/md';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
// const statusFilter = ['pending', 'fulfilled', 'cancelled'];
import './admin-sidebar.scss';
const AdminSideBar = () => {
  const dispatch = useDispatch();
  const { orderStatus } = useSelector((state) => state.order);
  const [logoutMutation] = useLogoutMutation();
  const navigate = useNavigate();
  const logoutAdmin = async () => {
    dispatch(
      toggleOrderAlert({
        alert: true,
        message: 'Logging out...',
      })
    );
    const response = await logoutMutation();
    if (response.data.message === 'logout successful') {
      dispatch(toggleOrderStatus(''));
      dispatch(
        toggleOrderAlert({
          alert: false,
          message: 'Logging out...',
        })
      );
      navigate('/');
    } else {
      console.log('Error ocurred');
    }
  };
  const style = {
    marginRight: '0.7em',
    fontSize: '1.2rem',
  };
  const statusFilter = [
    {
      title: 'pending',
      icon: <MdOutlinePendingActions style={style} />,
    },
    {
      title: 'fulfilled',
      icon: <IoMdCheckmarkCircleOutline style={style} />,
    },
    {
      title: 'cancelled',
      icon: <MdOutlineCancelPresentation style={style} />,
    },
  ];
  return (
    <div className="admin--sidebar">
      <p>FIND ORDER</p>
      <ul>
        <li
          onClick={() => {
            dispatch(toggleShowSearchOrderById(true));
          }}
        >
          <BsSearch style={style} /> Search by Order ID
        </li>
      </ul>
      {/* ++++++++++++++++ */}
      <p>FILTER ORDER BY STATUS</p>

      <ul>
        <li
          onClick={(e) => {
            dispatch(
              updateSingleOrder({
                isShow: false,
                order: '',
              })
            );
            dispatch(toggleShowSearchOrderById(false));
            dispatch(toggleOrderStatus(''));
          }}
          id={`${orderStatus === '' && 'active'}`}
        >
          <BsFillFilterSquareFill style={style} /> All orders
        </li>
        {statusFilter.map((item, index) => (
          <li
            key={index}
            onClick={(e) => {
              dispatch(updatePage(1));
              dispatch(
                updateSingleOrder({
                  isShow: false,
                  order: null,
                })
              );
              dispatch(toggleShowSearchOrderById(false));
              dispatch(toggleOrderStatus(e.target.innerText));
            }}
            id={`${item.title === orderStatus.toLowerCase() ? 'active' : ''}`}
          >
            {item.icon}
            <span> {item.title}</span>
          </li>
        ))}
      </ul>
      <p
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          bottom: '70px',
          cursor: 'pointer',
        }}
        onClick={logoutAdmin}
        className="logout"
      >
        {' '}
        <FiLogOut />
        <span
          style={{
            marginRight: '0.5em',
          }}
        >
          Logout
        </span>{' '}
      </p>
    </div>
  );
};

export default AdminSideBar;
