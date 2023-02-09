import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useUserContext } from '../context/UserContext';
import useCart from '../hooks/useCart';

import SuccessPopup from '../components/SuccessPopup';
import SelectMenu from '../components/SelectMenu';
import Button from '../components/Button';
import Footer from '../components/Footer';

export default function ProductDetail() {
  const { user } = useUserContext();
  const { addOrUpdateItem } = useCart();
  const {
    state: {
      product: { id, category, title, image, description, color, size, price },
    },
  } = useLocation();

  const [colorOption, setColorOption] = useState(color && color[0]);
  const [sizeOption, setSizeOption] = useState(size && size[0]);
  const [popup, setPopup] = useState(false);

  const handleClick = () => {
    if (!user) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    const product = { id, category, image, title, color: colorOption, size: sizeOption, price, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => setPopup(true),
    });
  };

  return (
    <>
      <main className="flex flex-col lg:flex-row justify-center gap-5 lg:gap-20">
        <div className="basis-5/12 xl:basis-1/3">
          <img className="mx-auto" src={image} alt={title} />
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
          {popup && <SuccessPopup onClick={setPopup} />}
          <Button text={'쇼핑백에 추가하기'} onClick={handleClick} />
        </div>
      </main>
      <Footer />
    </>
  );
}
