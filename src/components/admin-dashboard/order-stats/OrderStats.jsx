import React from 'react';
import {
  MdOutlinePendingActions,
  MdOutlineCancelPresentation,
} from 'react-icons/md';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

import './order-stats.scss';
import OrderStatCard from './OrderStatCard';

const OrderStats = ({ orderData }) => {
  return (
    <section className="order--stats">
      {' '}
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
    </section>
  );
};

export default OrderStats;
