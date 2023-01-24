import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import React from 'react';

import './orders-table.scss';
TimeAgo.addDefaultLocale(en);
const OrdersTable = ({ orders, getSingleOrder }) => {
  const timeAgo = new TimeAgo('en-US');
  return (
    <section className="orders--table">
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
              <td>
                <span
                  style={{
                    color: 'white',
                    borderRadius: '10px',
                    backgroundColor: `${
                      item.status === 'pending'
                        ? 'orange'
                        : item.status === 'fulfilled'
                        ? '#62C370'
                        : item.status === 'cancelled' && 'red'
                    }`,
                    padding: '5px',
                  }}
                >
                  {item.status}
                </span>
              </td>
              <td>{timeAgo.format(new Date(item?.createdAt || Date.now()))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default OrdersTable;
