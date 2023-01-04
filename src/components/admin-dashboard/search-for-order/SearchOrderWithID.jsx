import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { useGetSingleOrderMutation } from '../../../services/ordersApi';
import PreloaderLarge from '../../preloaders/PreloaderLarge';
import {
  toggleIsLoading,
  updateOrderId,
} from '../../../features/order/orderSlice';
import './searchForOrders.scss';
import { createDateString } from '../../../utils.';
import { toggleShowSearchOrderById } from '../../../features/order/orderSlice';

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
      <button
        onClick={() => {
          dispatch(toggleShowSearchOrderById(false));
        }}
        className="back--btn"
      >
        Back
      </button>
      <section
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="search--for--single--order"
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
        <section className="order--information">
          <h3>ORDER INFORMATION</h3>
          <section>
            {' '}
            <div>
              <p>Order ID</p>
              <p> {singleOrder?.order?._id}</p>
            </div>
            <div>
              <p>Date</p>
              <p>
                {!singleOrder?.order?.createdAt
                  ? 'nill'
                  : createDateString(singleOrder?.order?.createdAt)}
              </p>
            </div>
            <div>
              <p>Name</p>
              <p>{singleOrder?.order?.name}</p>
            </div>
            <div>
              <p>Location</p> <p>{singleOrder?.order?.location}</p>
            </div>
            <div>
              <p>Delivery Address</p>{' '}
              <p>{singleOrder?.order?.deliveryAddress}</p>
            </div>
            <div>
              <p>Phone Number</p> <p>{singleOrder?.order?.phoneNumber}</p>
            </div>
          </section>
          <section>
            {' '}
            <div>
              <p>Number of Bags</p>
              <p> {singleOrder?.order?.numOfBags || 0}</p>
            </div>
            <div>
              <p>Number of Packs</p>
              <p> {singleOrder?.order?.numOfPacks || 0}</p>
            </div>
            <div>
              <p>Total Amount</p>{' '}
              <p>
                &#8358;
                {formatter.format(Number(singleOrder?.order?.totalAmount))}
              </p>
            </div>
            <div>
              <p>Status</p>{' '}
              <p>
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
            </div>
          </section>
        </section>
      )}
    </div>
  );
};

export default SearchOrderWithID;
