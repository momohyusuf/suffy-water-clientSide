import React from "react";
import Slider from "./Slider";

const WhyUs = () => {
  return (
    <section className="why--us--container">
      <div
        style={{
          width: "700px",
          maxWidth: "100%",
        }}
      >
        <h2>Why you should trust us with your drinking water</h2>
      </div>
      <div className="slider--container">
        <Slider />
      </div>
    </section>
  );
};

export default WhyUs;
