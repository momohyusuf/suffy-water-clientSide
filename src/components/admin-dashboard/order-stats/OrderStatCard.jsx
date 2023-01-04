import CountUp from 'react-countup';

const OrderStatCard = ({ text, color, icon, number }) => {
  return (
    <div
      style={{
        color: color,
      }}
    >
      {' '}
      <p>{text}</p>
      <p
        style={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '0.5rem',
        }}
      >
        <span>
          {' '}
          {/* {number || 0} */}
          <CountUp start={0} end={number || 0} duration={2} />
        </span>
        {icon}
      </p>
    </div>
  );
};
export default OrderStatCard;
