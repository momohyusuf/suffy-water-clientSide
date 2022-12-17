import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  useEffect(() => {
    document.title = 'Error Page';
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
      }}
    >
      <div>
        <h1>Error 404</h1>
        <p>Your Url might be broken</p>
        <Link
          to="/"
          style={{
            backgroundColor: '#0f95f6',
            padding: '1em',
            lineHeight: '8rem',
            borderRadius: '5px',
            boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 6px',
            color: 'whitesmoke',
            fontWeight: '700',
          }}
        >
          Find my way back
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
