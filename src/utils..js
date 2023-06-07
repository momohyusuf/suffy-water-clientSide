// ************* for testing in developemnt enviroment **********
// export const url = 'http://localhost:5000';
// *****************

// *********** render sever url
// export const url = 'https://suffywater.onrender.com';
// ******************
// railway server url
export const url = 'https://suffy-server-side.up.railway.app';

export const createDateString = (value) => {
  const date = new Date(value);
  const dateString = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return `${dateString} ${timeString}`;
};
