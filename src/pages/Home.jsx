import React, { useEffect } from 'react';
import Banner from '../components/Banner';
import Products from '../components/Products';
import Footer from '../components/Footer';

export default function Home() {
  useEffect(() => {
    const pageTitle = document.querySelector('title');
    pageTitle.innerText = 'Lacoste';
  }, []);

  return (
    <>
      <Banner />
      <Products />
      <Footer />
    </>
  );
}
