import React from 'react';
import useCart from '../hooks/useCart';

import { SlPlus, SlMinus } from 'react-icons/sl';
import { TfiClose } from 'react-icons/tfi';

const ICON_CLASS = 'text-gray-700 text-lg cursor-pointer';

export default function CartItem({ product, product: { id, category, title, image, color, size, price, quantity } }) {
  const { addOrUpdateItem, removeItem } = useCart();

  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };
  const handlePlus = () => addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });
  const handleRemove = () => removeItem.mutate(id);

  return (
    <li className="relative flex justify-between items-center gap-4 p-4 border-b border-neutral-100">
      <img className="w-24 md:w-48" src={image} alt={title} />
      <div className="flex-1 flex flex-col sm:flex-row justify-between items-baseline sm:items-center">
        <div className="basis-1/2">
          <p className="font-semibold">{`(${category}) ${title}`}</p>
          <p className="text-sm">{`옵션 : ${color} ${size}`}</p>
        </div>
        <div className="flex items-center gap-x-4">
          <SlMinus className={ICON_CLASS} onClick={handleMinus} />
          <span>{quantity}</span>
          <SlPlus className={ICON_CLASS} onClick={handlePlus} />
        </div>
        <p className="text-brand font-semibold">{price.toLocaleString()}원</p>
        <TfiClose className={`${ICON_CLASS} absolute top-[calc(50%-9px)] right-4 sm:static`} onClick={handleRemove} />
      </div>
    </li>
  );
}
