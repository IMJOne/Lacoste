import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, product: { id, image, title, category, price } }) {
  const navigate = useNavigate();
  return (
    <li className="cursor-pointer" onClick={() => navigate(`/products/${id}`, { state: { product } })}>
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
