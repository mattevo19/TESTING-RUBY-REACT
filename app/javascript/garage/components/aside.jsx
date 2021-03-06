import React from 'react';

const Aside = (props) => {
  return (
    <div className="aside">
      <h1>{props.garage}</h1>
      <p>Our garage is the best. Reasonable prices, always on time, we are the best (and fictional).</p>
      {props.children}
    </div>
  );
}

export default Aside;