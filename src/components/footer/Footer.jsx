import React from 'react';
import { MdLocationPin } from 'react-icons/md';
import { BiPhoneCall } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { GoClock } from 'react-icons/go';

const Footer = () => {
  return (
    <footer>
      <section className="footer--content">
        <section>
          <div
            style={{
              padding: '0.2em 0',
              display: 'flex',
              alignItems: 'center',
            }}
          >
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
          <div>
            <GoClock
              color="white"
              style={{
                marginRight: '0.2em',
              }}
            />
            <div>
              <p> Open: Monday - Saturday</p>
              <p>Time: 08:00am - 05:00pm</p>
            </div>
          </div>
          {/* **************************** */}
          <div>
            <div>
              {' '}
              <p>
                Kes Corner Old Auchi Road,
                <br />
                Aviele, Estako West LGA,
                <br /> Edo Sate.
              </p>
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
          <div>
            <div>
              <p>
                Plot No: Bwari/FO2/1293,
                <br />
                Action Layout, Arab Contractor Road,
                <br /> FCT-Abuja.
              </p>
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
          <p>
            Copyright &#169; 2022 Hamsal Investment Nigeria Limited, All Right
            Reserved.
          </p>
          <p
            style={{
              fontSize: '0.5rem',
            }}
          >
            Developed by Starkweb Technologies +23409166454614, <br />
            +2347067435729
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
