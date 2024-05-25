import React from 'react';

function Card({ title, amount, change, changeType }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{amount}</p>
      <span className={changeType}>{change}</span>
    </div>
  );
}

export default Card;
