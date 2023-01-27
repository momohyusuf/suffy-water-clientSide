import React, { useState, useEffect } from 'react';

import CollectInputsValue from '../../components/inputs/CollectInputsValue';
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal, toggleAlert } from '../../features/order/orderSlice';
import PreloaderSmall from '../../components/preloaders/PreloaderSmall';
import Alert from '../../components//alerts/Alert';
import { useCreateOrderMutation } from '../../services/ordersApi';
import Navbar from '../../components/homepage-navbar/Navbar';
import HomePageSidebar from '../../components/homepage-sidebar/HomePageSidebar';
import { FaMoneyBill } from 'react-icons/fa';
import './placeOrder.scss';
const PlaceOrder = () => {
  const [orderInformation, setOrderInformation] = useState({
    numOfPacks: '',
    numOfBags: '',
    name: '',
    deliveryAddress: '',
    phoneNumber: '',
    location: '',
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const { modal, alert, isSidebarOpen } = useSelector((state) => state.order);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  // ++++++++
  const [createOrderMutation] = useCreateOrderMutation();
  // +++++++++++++++
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setOrderInformation((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    document.title = 'Place Order';
    setTotalAmount(
      Number(orderInformation.numOfBags) * Number(200) +
        Number(orderInformation.numOfPacks) * Number(800)
    );
  }, [orderInformation]);

  //   convert number to currency string
  const formatter = new Intl.NumberFormat();

  // ++++++++++++++++++++++++

  // submit orderInformation to data base

  const handleSubmit = async () => {
    if (!orderInformation.numOfBags && !orderInformation.numOfPacks) {
      dispatch(
        toggleAlert({
          showAlert: true,
          message: 'At least some quantity of water is required',
        })
      );
      return;
    }
    if (
      orderInformation.location === 'Estako-west' &&
      orderInformation.numOfPacks
    ) {
      dispatch(
        toggleAlert({
          showAlert: true,
          message: '75cl bottle water currently not available at Estako-west',
        })
      );
      return;
    }

    if (totalAmount < 2000) {
      dispatch(
        toggleAlert({
          showAlert: true,
          message: 'Minimum order of ₦2000',
        })
      );
      return;
    }
    if (
      !orderInformation.name ||
      !orderInformation.deliveryAddress ||
      !orderInformation.phoneNumber ||
      !orderInformation.location
    ) {
      dispatch(
        toggleAlert({
          showAlert: true,
          message: 'Please ensure your contact information are provided',
        })
      );
      return;
    }
    setIsPending(true);

    const response = await createOrderMutation({
      orderInformation,
      totalAmount,
    });

    if (response.data) {
      dispatch(
        toggleModal({
          open: true,
          message: response?.data?.message,
          order: response?.data?.order,
        })
      );
      setOrderInformation({
        numOfBags: '',
        numOfPacks: '',
        phoneNumber: '',
        location: '',
        deliveryAddress: '',
        name: '',
      });
      setIsPending(false);
      return;
    }

    if (response.error.data.message) {
      setIsPending(false);
      dispatch(
        toggleAlert({
          showAlert: true,
          message: response.error.data.message,
        })
      );
    } else if (response.error.status === 'FETCH_ERROR' || response.error.data) {
      setIsPending(false);
      dispatch(
        toggleAlert({
          showAlert: true,
          message: 'Network Error try again later',
        })
      );
    }
  };

  return (
    <>
      <Navbar />
      {isSidebarOpen && <HomePageSidebar />}
      {alert.showAlert && <Alert />}
      {modal.open && <Modal />}
      <div className="form--container">
        <div className="ocean">
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="place--order--form--container"
        >
          {/* ======================================== */}
          <div className="item--order">
            <img src={require('../../assets/images/bags.jpg')} alt="bags" />{' '}
            <p>
              Number of bags <br /> 50cl sachet
            </p>
          </div>
          <section className="quantity--container">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {' '}
              <input
                name="numOfBags"
                type="number"
                value={orderInformation.numOfBags}
                onChange={handleInputs}
                placeholder="0"
              />
              <p>X &#8358;200</p>
            </div>
            <p>
              {' '}
              &#8358;
              {formatter.format(
                Number(orderInformation.numOfBags) * Number(200)
              )}
            </p>
          </section>
          {/* ============================================== */}
          {/* +++++++++++++++++++++++++++++++++++++++++++ */}
          {/* +++++++++++++++++++++++++++++++++++++++++++ */}
          {/* ======================================== */}
          <div className="item--order">
            <img src={require('../../assets/images/packs.jpg')} alt="packs" />
            <p>
              Number of packs <br /> 75cl bottle
            </p>
          </div>

          <section className="quantity--container">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {' '}
              <input
                name="numOfPacks"
                type="number"
                value={orderInformation.numOfPacks}
                onChange={handleInputs}
                placeholder="0"
              />
              <p>X &#8358;800</p>
            </div>
            <p>
              {' '}
              &#8358;
              {formatter.format(
                Number(orderInformation.numOfPacks) * Number(800)
              )}
            </p>
          </section>
          {/* ============================================== */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '0.7em 0',
            }}
          >
            <b> Total: </b>
            <span>
              <b>&#8358;{formatter.format(totalAmount)} </b>
            </span>
          </div>
          <p>Contact information</p>
          <p>
            Name
            <span
              style={{
                color: 'red',
              }}
            >
              *
            </span>
          </p>
          <CollectInputsValue
            value={orderInformation.name}
            name="name"
            label="Name"
            type="text"
            handleInputs={handleInputs}
          />
          <p>
            Location
            <span
              style={{
                color: 'red',
              }}
            >
              *
            </span>
          </p>
          <select
            name="location"
            value={orderInformation.location}
            onChange={handleInputs}
          >
            <option value="">--select your location--</option>
            <option value="Abuja"> Abuja</option>
            <option value="Estako-west">Estako west</option>
          </select>
          <p>
            Delivery Address
            <span
              style={{
                color: 'red',
              }}
            >
              *
            </span>
          </p>
          <CollectInputsValue
            name="deliveryAddress"
            label="Delivery Address"
            type="text"
            value={orderInformation.deliveryAddress}
            handleInputs={handleInputs}
          />
          <p>
            Phone Number
            <span
              style={{
                color: 'red',
              }}
            >
              *
            </span>
          </p>
          <CollectInputsValue
            name="phoneNumber"
            type="tel"
            value={orderInformation.phoneNumber}
            handleInputs={handleInputs}
          />
          <button
            className="place--order--btn"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {!isPending ? <span>Confirm Order</span> : <PreloaderSmall />}
          </button>
        </form>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          {' '}
          <FaMoneyBill
            style={{
              fontSize: '3rem',
              color: 'green',
            }}
          />
          <p
            style={{
              fontSize: '1.25rem',
            }}
          >
            We currently only support payment on delivery
          </p>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
