import React from "react";
import Navbar from "../../components/navbar/Navbar";

import Hero from "../../components/hero/Hero";
import HomePageSidebar from "../../components/HomePageSidebar";
import { useDispatch, useSelector } from "react-redux";
import WhyUs from "../../components/homepage-content/WhyUs";
import ImageIllustrations from "../../components/homepage-content/ImageIllustrations";
import Reviews from "../../components/homepage-content/Reviews";

import { useEffect } from "react";
import { useShowCurrentAdminMutation } from "../../services/authApi";
import { toggleIsLoading } from "../../features/order/orderSlice";
import { useNavigate } from "react-router-dom";
import { updateAdmin } from "../../features/admin/adminSlice";
import HomepagePreloader from "../../components/HomepagePreloader";

const Homepage = () => {
  const { isSidebarOpen, isLoading } = useSelector((state) => state.order);
  const [showCurrentAdminMutation] = useShowCurrentAdminMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showAdmin = async () => {
    dispatch(toggleIsLoading(true));
    const response = await showCurrentAdminMutation();
    if (response.data) {
      dispatch(updateAdmin(response.data));
      dispatch(toggleIsLoading(false));
      navigate("/admin");
    } else {
      dispatch(toggleIsLoading(false));
    }
  };
  useEffect(() => {
    showAdmin();
  }, []);

  if (isLoading) return <HomepagePreloader />;
  return (
    <div>
      <Navbar />
      {isSidebarOpen && <HomePageSidebar />}
      <Hero />
      <WhyUs />
      <ImageIllustrations />
      <Reviews />
    </div>
  );
};

export default Homepage;
