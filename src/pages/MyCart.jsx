import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { getCart } from '../api/firebase';
import { useUserContext } from '../context/UserContext';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import { BiShoppingBag } from 'react-icons/bi';

const SHIPPING = 3000;

export default function MyCart() {
  const { user, uid } = useUserContext();
  const { isLoading, error, data: products } = useQuery(['carts'], () => getCart(uid));

  const hasProducts = products && products.length > 0;
  const totalPrice =
    // 제품 정보를 JSON 형태의 문자열로 받아오므로
    // 숫자로 변환해준 후 가격과 수량을 고려하여 총액 계산
    hasProducts && products.reduce((prev, current) => prev + parseInt(current.price) * current.quantity);

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <UnavailablePage text={'로그인 후 이용 가능합니다.'} />;
  return (
    <main>
      {!hasProducts && <UnavailablePage text={'고객님의 장바구니가 비어있습니다.'} />}
      {hasProducts && (
        <section>
          <ul>{products && products.map(product => <CartItem key={product.id} product={product} uid={uid} />)}</ul>
          <div>
            <PriceCard text={'상품 총액'} price={totalPrice} />
            <span>+</span>
            <PriceCard text={'배송액'} price={SHIPPING} />
            <span>=</span>
            <PriceCard text={'총 가격'} price={totalPrice + SHIPPING} />
          </div>
        </section>
      )}
    </main>
  );
}

function UnavailablePage({ text }) {
  return (
    <section className="h-[calc(100vh-64px)] lg:h-[calc(100vh-168px)] bg-neutral-100 flex flex-col justify-center items-center gap-8 mt-4">
      <BiShoppingBag className="text-9xl text-gray-300" />
      <h1 className="text-2xl font-semibold">{text}</h1>
      <Link
        className="bg-black text-white px-10 py-4 rounded-md uppercase font-bold transition-opacity hover:opacity-50"
        to={'/'}
      >
        Continue Shopping
      </Link>
    </section>
  );
}
