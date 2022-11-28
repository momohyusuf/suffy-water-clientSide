import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateSingleOrder,
  toggleOrderStatus,
  toggleOrderAlert,
} from '../../features/order/orderSlice';
import {
  useUpdateOrderStatusMutation,
  useGetSingleOrderMutation,
} from '../../services/ordersApi';
import UpdatedStatus from './UpdatedStatus';

const SingleOrder = ({ getAllOrders }) => {
  const dispatch = useDispatch();
  const { singleOrder, orderStatus } = useSelector((state) => state.order);
  const formatter = new Intl.NumberFormat();
  const [updateOrderStatusMutation] = useUpdateOrderStatusMutation();
  const [getSingleOrderMutation] = useGetSingleOrderMutation();
  const [status, setStatus] = useState('');
  // +++++++++++++++++++
  const updateOrderStatus = async (id, param) => {
    dispatch(
      toggleOrderAlert({
        alert: true,
        message: 'Updating order status',
      })
    );
    const { data } = await updateOrderStatusMutation({
      id,
      orderStatus: param,
    });
    if (data?.status) {
      dispatch(
        toggleOrderAlert({
          alert: false,
          message: '',
        })
      );
      setStatus(data.status);
    }
  };

  // ++++++++++++++++++++++++++++
  const getSingleOrder = async () => {
    const result = await getSingleOrderMutation(singleOrder.order._id);
    if (result.data) {
      dispatch(
        updateSingleOrder({
          isShown: true,
          order: result?.data?.order,
        })
      );
    } else {
      console.log('error occured');
    }
  };

  useEffect(() => {
    getSingleOrder();
  }, [orderStatus]);

  return (
    <div className="single--order--container">
      <button
        onClick={() => {
          dispatch(
            updateSingleOrder({
              isShown: false,
              order: null,
            })
          );
          getAllOrders();
        }}
        className="back--btn"
      >
        Back
      </button>

      <section className="order--information">
        <h3>Order Information</h3>
        <p>
          <strong>Order ID</strong>: {singleOrder?.order._id}
        </p>
        <p>
          <strong>Date</strong>:{' '}
          {new Date(singleOrder?.order?.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Name</strong>: {singleOrder.order.name}
        </p>
        <p>
          <strong>Location</strong>: {singleOrder.order.location}
        </p>
        <p>
          <strong>Delivery Address</strong>: {singleOrder.order.deliveryAddress}
        </p>
        <p>
          <strong>Phone Number</strong>: {singleOrder.order.phoneNumber}
        </p>
        <p>
          <strong>Number of Bags</strong>: {singleOrder.order.numOfBags || 0}
        </p>
        <p>
          <strong>Number of Packs</strong>: {singleOrder.order.numOfPacks || 0}
        </p>
        <p>
          <strong>Total Amount</strong>: &#8358;
          {formatter.format(Number(singleOrder.order.totalAmount))}
        </p>
        <p>
          <strong>Status</strong>:{' '}
          <span>
            <UpdatedStatus
              color={`${
                (status || singleOrder.order.status) === 'pending'
                  ? 'orange'
                  : (status || singleOrder.order.status) === 'fulfilled'
                  ? '#62C370'
                  : (status || singleOrder.order.status) === 'cancelled'
                  ? 'red'
                  : 'black'
              }`}
              status={status || singleOrder.order.status}
            />
          </span>
        </p>

        <p>Update order status</p>
        <select
          name="updateOrder"
          onChange={(e) => {
            updateOrderStatus(singleOrder.order._id, e.target.value);
          }}
        >
          <option value="">-- update --</option>
          <option value="pending">Pending</option>
          <option value="fulfilled">Fulfilled</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </section>
    </div>
  );
};

export default SingleOrder;
