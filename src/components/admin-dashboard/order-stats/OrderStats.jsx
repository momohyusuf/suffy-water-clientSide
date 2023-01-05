import React from 'react';
import {
  MdOutlinePendingActions,
  MdOutlineCancelPresentation,
} from 'react-icons/md';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

import './order-stats.scss';
import OrderStatCard from './OrderStatCard';

const OrderStats = ({ ordersStats }) => {
  return (
    <section className="order--stats">
      {' '}
      <OrderStatCard
        text="PENDING"
        icon={<MdOutlinePendingActions />}
        number={ordersStats?.pending}
        color="orange"
      />
      <OrderStatCard
        text="FULFILLED"
        icon={<IoMdCheckmarkCircleOutline />}
        number={ordersStats?.fulfilled}
        color="green"
      />
      <OrderStatCard
        text="CANCELLED"
        icon={<MdOutlineCancelPresentation />}
        number={ordersStats?.cancelled}
        color="red"
      />
    </section>
  );
};

export default OrderStats;
