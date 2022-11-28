import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  useGetAllOrdersMutation,
  useGetSingleOrderMutation,
} from '../../services/ordersApi';
import {
  updateSingleOrder,
  updateOrders,
  toggleOrderAlert,
} from '../../features/order/orderSlice';
import SingleOrder from './SingleOrder';
import PreloaderLarge from '../PreloaderLarge';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Pagination from './Pagination';
import SearchOrderWithID from './SearchOrderWithID';
import FetchingSingleOrderInformationAlert from '../FetchingSingleOrderInformationAlert';
import OrderStats from './OrderStats';

TimeAgo.addDefaultLocale(en);
const AdminPageContent = () => {
  const [orderData, setOrderData] = useState(null);
  const { admin } = useSelector((state) => state.admin);
  const { orderAlert } = useSelector((state) => state.order);
  const { singleOrder, orderStatus, orders, page, showSearchOrderById } =
    useSelector((state) => state.order);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [getAllOrdersMutation] = useGetAllOrdersMutation();
  const [getSingleOrderMutation] = useGetSingleOrderMutation();
  const dispatch = useDispatch();

  const timeAgo = new TimeAgo('en-US');

  // ++++++++++++++++++++++++++++
  const getAllOrders = async () => {
    setLoadingOrders(true);
    const { data } = await getAllOrdersMutation({
      orderStatus,
      page,
    });

    dispatch(updateOrders(data));
    setLoadingOrders(false);

    setOrderData(data?.orderStatsNumbers);
  };

  useEffect(() => {
    getAllOrders();
  }, [page, orderStatus]);
  // +===========================

  const getSingleOrder = async (id) => {
    dispatch(
      toggleOrderAlert({
        alert: true,
        message: 'Fetching order information...',
      })
    );
    const result = await getSingleOrderMutation(id);
    if (result.data) {
      dispatch(
        updateSingleOrder({
          isShown: true,
          order: result?.data?.order,
        })
      );
      dispatch(
        toggleOrderAlert({
          alert: false,
          message: '',
        })
      );
    } else {
      dispatch(
        toggleOrderAlert({
          alert: false,
          message: '',
        })
      );
      console.log('error occurred');
    }
  };

  return (
    <div className="admin--page--content">
      <h1 style={{ textAlign: 'center' }}>
        {admin?.user?.location.toUpperCase()}
      </h1>
      {orderAlert.alert && <FetchingSingleOrderInformationAlert />}

      {loadingOrders ? (
        <PreloaderLarge />
      ) : showSearchOrderById ? (
        <SearchOrderWithID />
      ) : !singleOrder.isShown ? (
        <>
          {orders?.orders?.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                marginTop: '10rem',
              }}
            >
              <h3>Sorry No {orderStatus} orders</h3>
            </div>
          ) : (
            <>
              {orderStatus === '' && <OrderStats orderData={orderData} />}
              <table>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Delivery address</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>

                <tbody>
                  {orders?.orders?.map((item, index) => (
                    <tr onClick={() => getSingleOrder(item._id)} key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.deliveryAddress}</td>
                      <td>{item.location}</td>
                      <td
                        style={{
                          color: `${
                            item.status === 'pending'
                              ? 'orange'
                              : item.status === 'fulfilled'
                              ? '#62C370'
                              : item.status === 'cancelled' && 'red'
                          }`,
                        }}
                      >
                        {item.status}
                      </td>
                      <td>
                        {timeAgo.format(
                          new Date(item?.createdAt || Date.now())
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      ) : (
        <SingleOrder getAllOrders={getAllOrders} />
      )}
      {orders?.totalOrders <= 20 || (!singleOrder.isShown && <Pagination />)}
    </div>
  );
};

export default AdminPageContent;
