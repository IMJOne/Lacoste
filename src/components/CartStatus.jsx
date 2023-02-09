import React from 'react';
import { Link } from 'react-router-dom';

import { useUserContext } from '../context/UserContext';
import useCart from '../hooks/useCart';

export default function CartStatus() {
  const { user } = useUserContext();
  const {
    cartQuery: { data: products },
  } = useCart();

  return (
    <Link className="relative" to={'/cart'}>
      <img src="/images/cart.png" alt="장바구니" />
      {user && products && (
        <span className="absolute -top-1 -right-2 w-4 h-4 text-center bg-brand text-white text-xs font-bold rounded-full">
          {products.length}
        </span>
      )}
    </Link>
  );
}
