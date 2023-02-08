import React from 'react';
import { Link } from 'react-router-dom';

import { useUserContext } from '../context/UserContext';
import { GoThreeBars } from 'react-icons/go';
import CartStatus from './CartStatus';
import User from './User';

export default function Navbar() {
  const { user, login, logout } = useUserContext();
  const menu = ['New', 'Men', 'Women', 'Kids', 'Sale', 'Polo', 'Sneakers', 'Collections', 'We are Lacoste'];

  return (
    <header className="sticky top-0 bg-white px-4 lg:px-6">
      <div className="h-16 lg:h-24 flex lg:justify-center items-center">
        <GoThreeBars className="block lg:hidden text-2xl mr-4" />
        <Link to={'/'}>
          <img className="w-40 lg:w-64" src="/images/logo.png" alt="라코스테" />
        </Link>
        <div className="absolute right-4 lg:right-6 flex justify-end items-center gap-x-4">
          <CartStatus />
          <button className="flex items-center gap-x-2" onClick={() => (user ? logout() : login())}>
            <img src="/images/person.png" alt="로그인" />
            <span className="hidden sm:block text-xs font-sans">
              {!user && '로그인'}
              {user && '로그아웃'}
            </span>
            {user && <User user={user} />}
          </button>
        </div>
      </div>
      <ul className="h-14 hidden lg:flex justify-center items-center gap-x-12">
        {menu.map((item, index) => (
          <li className="font-semibold whitespace-nowrap" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </header>
  );
}
