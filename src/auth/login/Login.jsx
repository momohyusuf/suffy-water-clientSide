import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PreloaderSmall from "../../components/PreloaderSmall";
import { toggleAlert } from "../../features/order/orderSlice";
import Alert from "../../components/Alert";
import { useLoginAdminMutation } from "../../services/authApi";
import { updateAdmin, updateIsPending } from "../../features/admin/adminSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import HomePageSidebar from "../../components/HomePageSidebar";

const Login = () => {
  const [loginInformation, setLoginInformation] = useState({
    userName: "",
    password: "",
  });
  const [loginAdminMutation] = useLoginAdminMutation();
  const { isLoading, alert, isSidebarOpen } = useSelector(
    (state) => state.order
  );
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
          message: "Please provide your login details",
        })
      );
      return;
    }
    dispatch(updateIsPending(true));

    const response = await loginAdminMutation(loginInformation);

    if (response.data) {
      dispatch(updateAdmin(response.data));
      dispatch(updateIsPending(false));
      navigate("/admin");
    }

    if (response.error.data.message) {
      dispatch(
        toggleAlert({
          showAlert: true,
          message: response?.error?.data?.message || response?.error?.message,
        })
      );
      dispatch(updateIsPending(false));
    } else if (response.error.status === "FETCH_ERROR" || response.error.data) {
      dispatch(updateIsPending(false));
      dispatch(
        toggleAlert({
          showAlert: true,
          message: "Network Error try again later",
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
          marginBottom: "3em",
          height: "calc(100vh - 300px)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <p>Username</p>
          <input
            onChange={handleInputs}
            value={loginInformation.userName}
            name="userName"
            type="text"
          />
          <p>Password</p>
          <input
            name="password"
            value={loginInformation.password}
            onChange={handleInputs}
            type="password"
          />
          <button disabled={isPending}>
            {!isPending ? <span>Log In</span> : <PreloaderSmall />}
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
