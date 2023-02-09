import React from 'react';

export default function PriceCard({ text, price, className }) {
  return (
    <div className={`${className} flex justify-between items-center p-4`}>
      <p>{text}</p>
      <p>{price.toLocaleString()}원</p>
    </div>
  );
}
