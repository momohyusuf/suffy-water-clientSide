import React from 'react';
import drinkWater from '../../assets/images/drinking-water.png';
import CustomBtn from '../CustomBtn';
import './hero.scss';

const Hero = () => {
  return (
    <section className="hero--container">
      <div className="hero--items">
        <article className="brand--description">
          <h1>Don't just drink water, Drink clean and healthy water</h1>
          <p>
            Providing Nigerians with easy access to clean, affordable, and
            healthy drinking water
          </p>
          <CustomBtn />
        </article>
        <div>
          <img
            src={drinkWater}
            alt="drinking-water"
            className="drink-water-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
