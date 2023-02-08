import React from 'react';
import { addOrUpdateCart, removeFromCart } from '../api/firebase';

export default function CartItem({ uid, product, product: { id, title, image, color, size, price, quantity } }) {
  const handlePlus = () => {
    if (quantity < 2) return;
    addOrUpdateCart(uid, { ...product, quantity: quantity + 1 });
  };
  const handleMinus = () => addOrUpdateCart(uid, { ...product, quantity: quantity - 1 });
  const handleRemove = () => removeFromCart(uid, id);

  return (
    <li>
      <img src={image} alt={title} />
      <div>
        <p>{title}</p>
        <p>
          {color} {size}
        </p>
        <div className="flex">
          <button className="bg-brand" onClick={handlePlus}>
            +
          </button>
          <span>{quantity}</span>
          <button onClick={handleMinus}>-</button>
          <button onClick={handleRemove}>삭제</button>
        </div>
      </div>
    </li>
  );
}
