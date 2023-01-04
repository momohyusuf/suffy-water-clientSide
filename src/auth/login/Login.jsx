import React, { useState, useEffect } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { BsKeyFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import PreloaderSmall from '../../components/preloaders/PreloaderSmall';
import { toggleAlert } from '../../features/order/orderSlice';
import Alert from '../../components/alerts/Alert';
import { useLoginAdminMutation } from '../../services/authApi';
import { updateAdmin } from '../../features/admin/adminSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/homepage-navbar/Navbar';
import HomePageSidebar from '../../components/homepage-sidebar/HomePageSidebar';
import './login.scss';

const Login = () => {
  const [loginInformation, setLoginInformation] = useState({
    userName: '',
    password: '',
  });
  const [loginAdminMutation] = useLoginAdminMutation();
  const { alert, isSidebarOpen } = useSelector((state) => state.order);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Suffy Water | Login';
  }, []);

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
    setIsPending(true);

    const response = await loginAdminMutation(loginInformation);

    if (response?.data) {
      dispatch(updateAdmin(response?.data));
      setIsPending(false);
      navigate('/admin');
    }

    if (response?.error?.data?.message) {
      dispatch(
        toggleAlert({
          showAlert: true,
          message: response?.error?.data?.message || response?.error?.message,
        })
      );
      setIsPending(false);
      return;
    } else if (
      response?.error?.status === 'FETCH_ERROR' ||
      response?.error?.data
    ) {
      setIsPending(false);
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
