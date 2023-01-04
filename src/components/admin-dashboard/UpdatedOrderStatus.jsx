import React from 'react';

const UpdatedOrderStatus = ({ status, color }) => {
  return (
    <span
      style={{
        backgroundColor: color,
        color: 'white',
        borderRadius: '5px',
        textTransform: 'capitalize',
        padding: '0.2em 0.3em',
      }}
    >
      {status}
    </span>
  );
};

export default UpdatedOrderStatus;
