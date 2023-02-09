import React from 'react';
import { Hearts } from 'react-loader-spinner';

export default function LoadingScreen() {
  return (
    <div className="bg-lightWhite fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <Hearts color="#105a33" />
    </div>
  );
}
