import React from 'react';
import './Spinner.css';

export default function Spinner({load}) {
  return (
    <div className="spinner-container d-flex justify-content-center align-items-center flex-column">
      <div className="loader">
      </div>
          <p className='fs-5 text-warning mt-1'>{`${load}`}</p>
    </div>
  );
}
