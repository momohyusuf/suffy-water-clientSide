import React from 'react';
import './whyUs.scss';

const WhyUs = () => {
  return (
    <section className="why--us--container">
      <h2>Why You Should Trust Us with your Drinking water</h2>
      <div className="top--content">
        {' '}
        <article>
          <h3>Modern Technology</h3>
          <p>
            Using state of the art facilities, we ensure that our water go
            through rigorous and proper treatment process using industry
            guidelines stipulated by NAFDAC and also ensuring it is safe for
            human consumption.
          </p>
        </article>
        <article>
          <h3>Customer's Satisfaction</h3>
          <p>
            Trusted by more than 100,000 household. Over the years we've made
            customer's satisfaction our priority. We're continually exploring
            ways to even satisfy our customers better.
          </p>
        </article>
      </div>
      <div>
        <article>
          {' '}
          <h3>Over 8years Experience</h3>
          <p>
            We've been providing affordable drinking Water to Nigerians for over
            8 years.{' '}
          </p>
        </article>
      </div>
    </section>
  );
};

export default WhyUs;
