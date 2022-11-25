import CountUp, { useCountUp } from 'react-countup';
import React from 'react';
import { GiCheckMark } from 'react-icons/gi';

import { FaHandshake, FaTruck } from 'react-icons/fa';

const OurNumbers = () => {
  useCountUp({
    ref: 'counter',
    end: 10000,
    enableScrollSpy: true,
  });

  return (
    <section className="our--numbers--container">
      {/* countUp code */}
      <div className="numbers">
        {/* <div className="content" /> */}
        {/* <CountUp
          className="figure"
          enableScrollSpy
          start={0}
          end={10000}
          separator=","
          duration={5}
          useEasing
        />{' '} */}
        <span id="counter" className="figure" />
        <span className="figure">+</span> <br />
        <FaHandshake className="numbers--icon--delivery" />
        <p>Customers.</p>
      </div>
      {/* ********************* */}
      <div className="numbers">
        <h2>
          {' '}
          <GiCheckMark /> Certified By
        </h2>
        <div>
          <img src={require('../../assets/images/nafdac-logo.png')} alt="" />{' '}
          <p>NAFDAC</p>
        </div>
      </div>
      {/* countUp code */}
      <div className="numbers">
        <CountUp
          className="figure"
          enableScrollSpy
          start={0}
          end={50000}
          separator=","
          duration={10}
        />{' '}
        <span className="figure">+</span> <br />
        <FaTruck className="numbers--icon--fulfilled" />
        <p>Fulfilled Orders.</p>
      </div>
      {/* ******************** */}
    </section>
  );
};

export default OurNumbers;
