import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateSingleOrder,
  toggleOrderAlert,
} from '../../../features/order/orderSlice';
import {
  useUpdateOrderStatusMutation,
  useGetSingleOrderMutation,
} from '../../../services/ordersApi';
import UpdatedOrderStatus from '../UpdatedOrderStatus';
import './singleOrderDetails.scss';

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

  const createDateString = (value) => {
    const date = new Date(value);
    const dateString = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const timeString = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return `${dateString} ${timeString}`;
  };
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
        <h3>ORDER INFORMATION</h3>
        <section>
          {' '}
          <div>
            <p>Order ID</p>
            <p> {singleOrder?.order._id}</p>
          </div>
          <div>
            <p>Date</p>
            <p>{createDateString(singleOrder?.order?.createdAt)}</p>
          </div>
          <div>
            <p>Name</p>
            <p>{singleOrder.order.name}</p>
          </div>
          <div>
            <p>Location</p> <p>{singleOrder.order.location}</p>
          </div>
          <div>
            <p>Delivery Address</p> <p>{singleOrder.order.deliveryAddress}</p>
          </div>
          <div>
            <p>Phone Number</p> <p>{singleOrder.order.phoneNumber}</p>
          </div>
        </section>
        <section>
          {' '}
          <div>
            <p>Number of Bags</p>
            <p> {singleOrder.order.numOfBags || 0}</p>
          </div>
          <div>
            <p>Number of Packs</p>
            <p> {singleOrder.order.numOfPacks || 0}</p>
          </div>
          <div>
            <p>Total Amount</p>{' '}
            <p>
              &#8358;
              {formatter.format(Number(singleOrder.order.totalAmount))}
            </p>
          </div>
          <div>
            <p>Status</p>{' '}
            <p>
              <UpdatedOrderStatus
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
            </p>
          </div>
          <div>
            {' '}
            <p>Update order status: </p>
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
          </div>
        </section>
      </section>
    </div>
  );
};

export default SingleOrder;
