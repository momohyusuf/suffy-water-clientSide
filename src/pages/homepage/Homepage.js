import React from 'react';
import Navbar from '../../components/homepage-navbar/Navbar';

import Hero from '../../components/hero/Hero';
import HomePageSidebar from '../../components/homepage-sidebar/HomePageSidebar';
import { useDispatch, useSelector } from 'react-redux';
import WhyUs from '../../components/homepage-content/why-us/WhyUs';
import ImageIllustrations from '../../components/homepage-content/image-illustartions/ImageIllustrations';
import Reviews from '../../components/homepage-content/reviews/Reviews';
import OurNumbers from '../../components/homepage-content/our-numbers/OurNumbers';

import { useEffect } from 'react';
import { useShowCurrentAdminMutation } from '../../services/authApi';
import { toggleIsLoading } from '../../features/order/orderSlice';
import { useNavigate } from 'react-router-dom';
import { updateAdmin } from '../../features/admin/adminSlice';
import MobileImage from '../../components/homepage-content/MobileImage';

const Homepage = () => {
  const { isSidebarOpen } = useSelector((state) => state.order);

  const [showCurrentAdminMutation] = useShowCurrentAdminMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showAdmin = async () => {
    document.title = 'Suffy Water';
    dispatch(toggleIsLoading(true));
    const response = await showCurrentAdminMutation();
    if (response.data) {
      dispatch(updateAdmin(response.data));
      dispatch(toggleIsLoading(false));
      navigate('/admin');
    } else {
      dispatch(toggleIsLoading(false));
    }
  };
  useEffect(() => {
    showAdmin();
  }, []);

  return (
    <div>
      <Navbar />
      {isSidebarOpen && <HomePageSidebar />}
      <Hero />
      <WhyUs />
      <MobileImage />
      <ImageIllustrations />
      <OurNumbers />
      <Reviews />
    </div>
  );
};

export default Homepage;
