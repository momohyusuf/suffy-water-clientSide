import React from "react";

const CollectInputsValue = ({
  label,
  min,
  type,
  handleInputs,
  name,
  value,
  className,
}) => {
  return (
    <div>
      <input
        min={min}
        type={type}
        onChange={handleInputs}
        name={name}
        value={value}
        className={className}
      />
    </div>
  );
};

export default CollectInputsValue;
