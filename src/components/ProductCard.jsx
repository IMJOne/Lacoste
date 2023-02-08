import React from 'react';

export default function ProductCard({ product: { image, title, category, price } }) {
  return (
    <li className="cursor-pointer">
      <img src={image} alt={title} />
      <div>
        <h3 className="text-sm mt-2 mb-1">
          ({category}) {title}
        </h3>
        <p className="text-sm font-bold text-brand">{`${price.toLocaleString()}원`}</p>
      </div>
    </li>
  );
}
