import { Fragment } from 'react';

export const Arrow = () => (
  <Fragment>
    <svg className="circle_svg" style={{ position: 'absolute', width: '100%', height: '100%' }} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
      <circle cx="50" cy="50"r="37" />
    </svg>
    <svg xmlns='http://www.w3.org/2000/svg' viewBox="0 0 12.3 7.5" style={{ width: '15px', margin: 'auto' }}>
      <polyline fill="none" strokeWidth="1" stroke="white" strokeMiterlimit="10" points="11.6,0.7 6.1,6.1 0.7,0.7" />
    </svg>
  </Fragment>
);

export const Close = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
    <line x1="0" y1="15" x2="15" y2="0"/>
    <line x1="15" y1="15" x2="0" y2="0"/>
  </svg>
);