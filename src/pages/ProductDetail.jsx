import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useUserContext } from '../context/UserContext';
import { addOrUpdateCart } from '../api/firebase';
import SelectMenu from '../components/SelectMenu';

export default function ProductDetail() {
  const { uid } = useUserContext();
  const {
    state: {
      product: { id, category, title, image, description, color, size, price },
    },
  } = useLocation();
  const [colorOption, setColorOption] = useState(color && color[0]);
  const [sizeOption, setSizeOption] = useState(size && size[0]);
  const handleClick = () => {
    const product = { id, image, title, color: colorOption, size: sizeOption, price, quantity: 1 };
    addOrUpdateCart(uid, product);
  };

  return (
    <main className="container mx-auto flex flex-col lg:flex-row justify-center gap-5 lg:gap-20 p-4">
      <div className="basis-5/12">
        <img src={image} alt={title} />
      </div>
      <section className="basis-3/12 flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold">{`(${category}) ${title}`}</h2>
          <p className="text-brand font-bold mt-2">{`${price.toLocaleString()}원`}</p>
        </div>
        <p className="text-sm">{description}</p>
        <div>
          <SelectMenu label={'색상'} value={colorOption} optionList={color} onChange={setColorOption} />
          <SelectMenu label={'사이즈'} value={sizeOption} optionList={size} onChange={setSizeOption} />
        </div>
        <button
          className="bg-brand text-white font-bold px-20 py-4 rounded-full transition-all hover:brightness-150"
          onClick={handleClick}
        >
          쇼핑백에 추가하기
        </button>
      </section>
    </main>
  );
}
