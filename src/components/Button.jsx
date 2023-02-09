import React from 'react';

export default function Button({ text, onClick }) {
  return (
    <button
      className="bg-brand text-white font-bold px-20 py-4 rounded-full transition-all hover:brightness-150"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
