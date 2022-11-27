import React, { useEffect } from 'react';

const UpdatedStatus = ({ status, color }) => {
  return (
    <span
      style={{
        color: color,
      }}
    >
      {status}
    </span>
  );
};

export default UpdatedStatus;
