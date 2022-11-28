import React from 'react';
import {
  MdOutlinePendingActions,
  MdOutlineCancelPresentation,
} from 'react-icons/md';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
const OrderStats = ({ orderData }) => {
  const style = {
    display: 'flex',
    columnGap: '1em',
    marginTop: '2em',
    padding: '1em',
    borderRadius: '5px',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    width: 'fit-content',
  };
  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {' '}
      <div style={style}>
        <OrderStatCard
          text="PENDING"
          icon={<MdOutlinePendingActions />}
          number={orderData?.pending}
          color="orange"
        />
        <OrderStatCard
          text="FULFILLED"
          icon={<IoMdCheckmarkCircleOutline />}
          number={orderData?.fulfilled}
          color="green"
        />
        <OrderStatCard
          text="CANCELLED"
          icon={<MdOutlineCancelPresentation />}
          number={orderData?.cancelled}
          color="red"
        />
      </div>
    </section>
  );
};

export const OrderStatCard = ({ text, color, icon, number }) => {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        color: color,
        fontSize: '2rem',
        fontWeight: '700',
      }}
    >
      {' '}
      <p>{text}</p>
      <p
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '0.3em',
        }}
      >
        <span
          style={{
            marginRight: '0.3em',
          }}
        >
          {' '}
          {number || 0}
        </span>
        {icon}
      </p>
    </div>
  );
};

export default OrderStats;
