import React, { useEffect } from 'react';
import Homepage from './pages/homepage/Homepage';
import { Routes, Route } from 'react-router-dom';
import SharedLayout from './components/SharedLayout';
import PlaceOrder from './pages/place-order/PlaceOrder';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAlert } from './features/order/orderSlice';
import Admin from './pages/admin/Admin';
import Login from './auth/login/Login';
import PrivateRoutes from './components/PrivateRoutes';
import ErrorPage from './pages/error-page/ErrorPage';

const App = () => {
  const { alert } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(
        toggleAlert({
          showAlert: false,
          message: '',
        })
      );
    }, 2000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [alert.showAlert]);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Homepage />} />
        <Route path="sign-in" element={<Login />} />
        <Route path="place-order" element={<PlaceOrder />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
