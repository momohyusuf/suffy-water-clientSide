import React from 'react';

const UpdatedStatus = ({ status, color }) => {
  return (
    <span
      style={{
        color: color,
        textTransform: 'capitalize',
      }}
    >
      {status}
    </span>
  );
};

export default UpdatedStatus;
