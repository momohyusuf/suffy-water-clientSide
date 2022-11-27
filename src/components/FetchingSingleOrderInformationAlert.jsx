import React from 'react';
import { useSelector } from 'react-redux';

const FetchingSingleOrderInformationAlert = () => {
  const { orderAlert } = useSelector((state) => state.order);
  return (
    <div className="singleOrder--information--alert">
      <p>{orderAlert.message}</p>
      <div className="single--order--loader"></div>
    </div>
  );
};

export default FetchingSingleOrderInformationAlert;
