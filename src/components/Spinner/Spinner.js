import React from 'react';

import './Spinner.css';

export const SpinnerSmall = () => (
  <div className='spinner-overlay-small'>
    <div className='spinner-container-small' />
  </div>
);

export const SpinnerBig = () => (
    <div className='spinner-overlay-big'>
      <div className='spinner-container-big' />
    </div>
  );
  
