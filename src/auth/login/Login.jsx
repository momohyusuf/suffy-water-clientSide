import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { BsKeyFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import PreloaderSmall from '../../components/PreloaderSmall';
import { toggleAlert } from '../../features/order/orderSlice';
import Alert from '../../components/Alert';
import { useLoginAdminMutation } from '../../services/authApi';
import { updateAdmin, updateIsPending } from '../../features/admin/adminSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import HomePageSidebar from '../../components/HomePageSidebar';

const Login = () => {
  const [loginInformation, setLoginInformation] = useState({
    userName: '',
    password: '',
  });
  const [loginAdminMutation] = useLoginAdminMutation();
  const { alert, isSidebarOpen } = useSelector((state) => state.order);
  const { isPending } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // +++++++++++++++++++++
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginInformation.password || !loginInformation.userName) {
      dispatch(
        toggleAlert({
          showAlert: true,
          message: 'Please provide your login details',
        })
      );
      return;
    }
    dispatch(updateIsPending(true));

    const response = await loginAdminMutation(loginInformation);

    if (response?.data) {
      dispatch(updateAdmin(response?.data));
      dispatch(updateIsPending(false));
      navigate('/admin');
    }

    if (response?.error?.data?.message) {
      dispatch(
        toggleAlert({
          showAlert: true,
          message: response?.error?.data?.message || response?.error?.message,
        })
      );
      dispatch(updateIsPending(false));
      return;
    } else if (
      response?.error?.status === 'FETCH_ERROR' ||
      response?.error?.data
    ) {
      dispatch(updateIsPending(false));
      dispatch(
        toggleAlert({
          showAlert: true,
          message: 'Network Error try again later',
        })
      );
    }
  };
  // +++++++++++++++++++++++++++++++++

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setLoginInformation((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  return (
    <>
      <Navbar />
      {isSidebarOpen && <HomePageSidebar />}
      {alert.showAlert && <Alert />}
      <section
        className="form--container"
        style={{
          marginBottom: '3em',
        }}
      >
        <form onSubmit={handleSubmit} className="login--container">
          <div className="login--input--container">
            {' '}
            <FaUserAlt color="#0f95f6" className="login-icons" />
            <input
              onChange={handleInputs}
              value={loginInformation.userName}
              name="userName"
              type="text"
              placeholder="Username"
            />
          </div>

          <div className="login--input--container">
            <BsKeyFill color="#0f95f6" className="login-icons" />
            <input
              name="password"
              value={loginInformation.password}
              onChange={handleInputs}
              type="password"
              placeholder="Password"
            />
          </div>
          <button disabled={isPending}>
            {!isPending ? <span>Log In</span> : <PreloaderSmall />}
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
