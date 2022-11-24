import React from 'react';
import { useSelector } from 'react-redux';

const FetchingSingleOrderInformationAlert = () => {
  const { alert } = useSelector((state) => state.order);
  return (
    <div className="singleOrder--information--alert">
      <p>{alert.message}</p>
      <div className="single--order--loader"></div>
    </div>
  );
};

export default FetchingSingleOrderInformationAlert;
