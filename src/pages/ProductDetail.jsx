import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import useCart from '../hooks/useCart';
import SelectMenu from '../components/SelectMenu';
import Button from '../components/Button';

export default function ProductDetail() {
  const { addOrUpdateItem } = useCart();
  const {
    state: {
      product: { id, category, title, image, description, color, size, price },
    },
  } = useLocation();

  const [colorOption, setColorOption] = useState(color && color[0]);
  const [sizeOption, setSizeOption] = useState(size && size[0]);
  const [success, setSuccess] = useState();

  const handleClick = () => {
    const product = { id, category, image, title, color: colorOption, size: sizeOption, price, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => setSuccess('장바구니에 추가되었습니다.'),
    });
  };

  return (
    <main className="flex flex-col lg:flex-row justify-center gap-5 lg:gap-20 p-4">
      <div className="basis-5/12">
        <img src={image} alt={title} />
      </div>
      <div className="basis-3/12 flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold">{`(${category}) ${title}`}</h2>
          <p className="text-brand font-bold mt-2">{`${price.toLocaleString()}원`}</p>
        </div>
        <p className="text-sm">{description}</p>
        <div>
          <SelectMenu label={'색상'} value={colorOption} optionList={color} onChange={setColorOption} />
          <SelectMenu label={'사이즈'} value={sizeOption} optionList={size} onChange={setSizeOption} />
        </div>
        {success && <p>장바구니에 추가되었습니다.</p>}
        <Button text={'쇼핑백에 추가하기'} onClick={handleClick} />
      </div>
    </main>
  );
}
