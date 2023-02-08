import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getCart } from '../api/firebase';
import { useUserContext } from '../context/UserContext';

export default function CartStatus() {
  const { user, uid } = useUserContext();
  const { data: products } = useQuery(['carts'], () => getCart(uid));

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
