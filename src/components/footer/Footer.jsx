import React from 'react';

import { BiPhoneCall } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { GoClock } from 'react-icons/go';
import { IoLocationSharp } from 'react-icons/io5';
import './footer.scss';

const Footer = () => {
  return (
    <footer>
      <section className="footer--content">
        <section>
          <div>
            <img
              src={require('../../assets/images/nafdac-logo.jpeg')}
              width="30px"
              alt="nafadac logo"
              style={{
                marginRight: '0.6em',
                borderRadius: '50%',
              }}
            />
            <p>NAFDAC REG: C1 - 9914L</p>
          </div>
          {/* *************************** */}
          <div className="company--address">
            <GoClock color="white" />
            <div>
              <p> Open: Monday - Saturday</p>
              <p>Time: 08:00am - 05:00pm</p>
            </div>
          </div>
          {/* **************************** */}
          <div className="company--address">
            <IoLocationSharp color="red" />{' '}
            <div>
              {' '}
              <p>Kes Corner Old Auchi Road,</p>
              <p> Aviele, Estako West LGA,</p>
              <p> Edo Sate.</p>
              <p>
                <BiPhoneCall
                  style={{
                    marginRight: '0.3em',
                  }}
                />
                Customer care: +2347036538201
              </p>
            </div>
          </div>

          {/* ********************** */}
          <div className="company--address">
            <IoLocationSharp color="red" />

            <div>
              <p> Plot No: Bwari / FO2 / 1293,</p>

              <p> Action Layout, Arab Contractor Road,</p>
              <p> FCT-Abuja.</p>

              <p>
                <BiPhoneCall
                  style={{
                    marginRight: '0.3em',
                  }}
                />
                Customer care: 08022233392
              </p>
              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <AiOutlineMail
                  style={{
                    marginRight: '0.3em',
                  }}
                />
                Email: omonemusadr@yahoo.co.uk
              </p>
            </div>
          </div>
        </section>
        {/* +++++++++++++++++ */}
        <div
          style={{
            textAlign: 'center',
            fontWeight: '300',
            borderTop: '1px solid rgb(52, 52, 52)',
            fontSize: '0.5rem',
            marginTop: '3rem',
          }}
        >
          <p
            style={{
              marginTop: '2rem',
            }}
          >
            &#169; 2022 | Suffy Packaging Nigeria Enterprise. All Right
            Reserved.
          </p>
          <p
            style={{
              fontSize: '0.7rem',
            }}
          >
            Powered by Starkweb Technologies. <br /> +23409166454614,
            +2347067435729
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
