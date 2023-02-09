import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { getProducts } from '../api/firebase';
import LoadingScreen from './LoadingScreen';
import NotFound from '../pages/NotFount';
import ProductCard from './ProductCard';

export default function Products() {
  // 데이터의 이름 및 캐시 키 지정
  const { isLoading, error, data: products } = useQuery(['proudcts'], getProducts);

  return (
    <main>
      {isLoading && <LoadingScreen />}
      {error && <NotFound />}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {products && products.map(product => <ProductCard key={product.id} product={product} />)}
      </ul>
    </main>
  );
}
