import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { useGetSingleOrderMutation } from '../../services/ordersApi';
import PreloaderLarge from '../PreloaderLarge';
import {
  toggleIsLoading,
  updateOrderId,
} from '../../features/order/orderSlice';

const SearchOrderWithID = () => {
  const { orderId, isLoading } = useSelector((state) => state.order);
  const [singleOrder, setSingleOrder] = useState(null);
  const [error, setError] = useState(null);
  const [getSingleOrderMutation] = useGetSingleOrderMutation();
  const dispatch = useDispatch();
  const formatter = new Intl.NumberFormat();
  const searchId = useRef();
  const getSingleOrder = async () => {
    setError(null);
    dispatch(toggleIsLoading(true));
    const result = await getSingleOrderMutation(orderId);
    if (result.data) {
      setSingleOrder(result.data);
      dispatch(toggleIsLoading(false));
    } else {
      setError(result.error.data.message);
      dispatch(toggleIsLoading(false));
    }
  };

  useEffect(() => {
    getSingleOrder();
  }, [orderId]);

  return (
    <div>
      <section
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="admin--page--content--header"
      >
        <input type="text" placeholder="Enter order ID" ref={searchId} />
        <FaSearch
          className="icon"
          onClick={() => {
            dispatch(updateOrderId(searchId.current.value));
          }}
        />
      </section>
      {isLoading ? (
        <PreloaderLarge />
      ) : singleOrder === null ? (
        <h2>Enter order Id in the search bar</h2>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <section
          style={{
            marginTop: '4em',
          }}
          className="order--information"
        >
          <h3>Order Information</h3>
          <p>
            <strong>Order ID</strong>: {singleOrder?.order?._id}
          </p>
          <p>
            <strong>Date</strong>:{' '}
            {new Date(singleOrder?.order?.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Name</strong>: {singleOrder?.order?.name}
          </p>
          <p>
            <strong>Location</strong>: {singleOrder?.order?.location}
          </p>
          <p>
            <strong>Delivery Address</strong>:{' '}
            {singleOrder?.order?.deliveryAddress}
          </p>
          <p>
            <strong>Phone Number</strong>: {singleOrder?.order?.phoneNumber}
          </p>
          <p>
            <strong>Number of Bags</strong>:{' '}
            {singleOrder?.order?.numOfBags || 0}
          </p>
          <p>
            <strong>Number of Packs</strong>:{' '}
            {singleOrder?.order?.numOfPacks || 0}
          </p>
          <p>
            <strong>Total Amount</strong>: &#8358;
            {formatter.format(Number(singleOrder?.order?.totalAmount))}
          </p>
          <p>
            <strong>Status</strong>:{' '}
            <span
              style={{
                color: `${
                  singleOrder?.order?.status === 'pending'
                    ? 'orange'
                    : singleOrder?.order?.status === 'fulfilled'
                    ? '#62C370'
                    : singleOrder?.order?.status === 'cancelled' && 'red'
                }`,
              }}
            >
              {singleOrder?.order?.status}
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default SearchOrderWithID;
