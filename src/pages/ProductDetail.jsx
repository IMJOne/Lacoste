import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SelectMenu from '../components/SelectMenu';

export default function ProductDetail() {
  const {
    state: {
      product: { id, category, title, image, description, color, size, price },
    },
  } = useLocation();
  const [colorOption, setColorOption] = useState(color && color[0]);
  const [sizeOption, setSizeOption] = useState(size && size[0]);
  const handleClick = e => {
    // 장바구니 추가
  };

  return (
    <main className="container mx-auto flex flex-col lg:flex-row justify-center gap-5 lg:gap-20 p-4">
      <div className="w-full basis-6/12">
        <img src={image} alt={title} />
      </div>
      <section className="w-full basis-4/12 flex flex-col gap-4">
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
