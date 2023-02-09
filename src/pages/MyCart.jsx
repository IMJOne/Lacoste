import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiShoppingBag } from 'react-icons/bi';

import { useUserContext } from '../context/UserContext';
import useCart from '../hooks/useCart';

import LoadingScreen from '../components/LoadingScreen';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import Button from '../components/Button';

const SHIPPING = 3000;

export default function MyCart() {
  const { user } = useUserContext();
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

  useEffect(() => {
    const pageTitle = document.querySelector('title');
    pageTitle.innerText = 'Lacoste - 내 쇼핑백';
  }, []);

  const hasProducts = products && products.length > 0;
  const totalPrice =
    // 제품 정보를 JSON 형태의 문자열로 받아오므로
    // 숫자로 변환해준 후 가격과 수량을 고려하여 총액 계산
    hasProducts && products.reduce((prev, current) => prev + parseInt(current.price) * current.quantity, 0);

  if (!user) return <UnavailablePage text={'로그인 후 이용 가능합니다.'} />;
  if (isLoading) return <LoadingScreen />;
  return (
    <>
      {!hasProducts && <UnavailablePage text={'고객님의 장바구니가 비어있습니다.'} />}
      {hasProducts && (
        <section>
          <h1 className="text-2xl text-center font-bold mb-4">내 쇼핑백</h1>
          <div className="container mx-auto flex flex-col lg:flex-row lg:items-start gap-8">
            <ul className="basis-2/3 bg-white">
              {products && products.map(product => <CartItem key={product.id} product={product} />)}
            </ul>
            <div className="basis-1/3 flex flex-col gap-4">
              <div className="bg-white">
                <PriceCard text={'상품 금액'} price={totalPrice} />
                <PriceCard text={'배송비'} price={SHIPPING} />
                <PriceCard text={'총 결제 예상금액'} price={totalPrice + SHIPPING} className={'font-bold'} />
              </div>
              <Button text={'주문하기'} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function UnavailablePage({ text }) {
  return (
    <section className="flex flex-col justify-center items-center gap-8 text-center">
      <BiShoppingBag className="text-9xl text-gray-300" />
      <h1 className="text-2xl font-semibold">{text}</h1>
      <Link className="bg-black text-white px-10 py-4 rounded-md uppercase font-bold" to={'/'}>
        Continue Shopping
      </Link>
    </section>
  );
}
