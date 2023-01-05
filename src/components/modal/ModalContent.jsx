import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useRef } from 'react';
import { BsReceipt } from 'react-icons/bs';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import logo from '../../assets/images/suffy-logo.png';

import { toggleModal } from '../../features/order/orderSlice';
import { createDateString } from '../../utils.';

const ModalContent = ({ orderInfo }) => {
  const formatter = new Intl.NumberFormat();
  const dispatch = useDispatch();
  const ref = useRef();

  const savePdf = async () => {
    // use html2canvas to convert the HTML element to a canvas element
    await html2canvas(ref.current).then(function (canvas) {
      // create a new jsPDF instance
      const doc = new jsPDF({});

      // add the canvas element to the PDF
      doc.addImage(canvas, 'JPEG', 12, 12);

      // save the PDF
      doc.save('Suffy-water-receipt.pdf');
    });

    dispatch(
      toggleModal({
        open: false,
        message: '',
      })
    );
  };

  return (
    <section>
      <div
        style={{
          backGroundColor: 'white',
          padding: '1em',
          borderBottom: '1px solid grey',
        }}
        ref={ref}
      >
        <div
          style={{
            display: 'flex',

            justifyContent: 'center',
          }}
        >
          <img src={logo} alt="logo" width="100px" />
        </div>
        <div>
          {' '}
          <p
            style={{
              display: 'flex',

              alignItems: 'center',
            }}
          >
            <span>{orderInfo?.message}</span>{' '}
            <IoMdCheckmarkCircle
              style={{
                fontSize: '1rem',
                color: '#006DA4',
                marginLeft: '0.3em',
              }}
            />
          </p>
          <p>OrederID: {orderInfo?.order?._id}</p>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {orderInfo?.order?.numOfBags && (
                <tr>
                  <td>Number of bags</td>
                  <td>{orderInfo?.order?.numOfBags}</td>
                  <td>
                    &#8358;
                    {formatter.format(orderInfo?.order?.numOfBags * 200)}
                  </td>
                </tr>
              )}
              {orderInfo?.order?.numOfPacks && (
                <tr>
                  <td>Number of Packs</td>
                  <td>{orderInfo?.order?.numOfPacks}</td>
                  <td>
                    &#8358;
                    {formatter.format(orderInfo?.order?.numOfPacks * 800)}
                  </td>
                </tr>
              )}
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>
                    {' '}
                    {orderInfo?.order?.numOfBags + orderInfo?.order?.numOfPacks}
                  </strong>
                </td>
                <td>
                  <strong>
                    {' '}
                    &#8358;
                    {formatter.format(orderInfo?.order?.totalAmount)}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>

          <div>
            <p
              style={{
                textTransform: 'capitalize',
              }}
            >
              {orderInfo?.order?.name}
            </p>
            <p
              style={{
                textTransform: 'capitalize',
              }}
            >
              {orderInfo?.order?.deliveryAddress}
            </p>
            <p>{orderInfo?.order?.phoneNumber}</p>
            <p>
              <span>{createDateString(orderInfo?.order.createdAt)}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="modal--content--btn">
        <button
          style={{
            backgroundColor: 'red',
            color: 'whitesmoke',
          }}
          onClick={() =>
            dispatch(
              toggleModal({
                open: false,
                message: '',
              })
            )
          }
        >
          <span>Close</span>
        </button>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            columnGap: '0.3em',
            backgroundColor: '#0f95f6',
            color: 'whitesmoke',
          }}
          onClick={savePdf}
        >
          <span>Download receipt</span>
          <BsReceipt />
        </button>
      </div>
    </section>
  );
};

export default ModalContent;
