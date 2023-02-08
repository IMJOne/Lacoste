import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import ProductCard from './ProductCard';

export default function Products() {
  // 데이터의 이름 및 캐시 키 지정
  const { isLoading, error, data: products } = useQuery(['proudcts'], getProducts);

  return (
    <section className="p-5 sm:p-10">
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      <ul className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {products && products.map(product => <ProductCard key={product.id} product={product} />)}
      </ul>
    </section>
  );
}
