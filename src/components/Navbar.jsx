import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useUserContext } from '../context/UserContext';
import CartStatus from './CartStatus';
import User from './User';

import { GoThreeBars } from 'react-icons/go';
import { TfiClose } from 'react-icons/tfi';

const MOBILE_MENU = 'fixed top-0 w-80 h-full flex flex-col items-center bg-white p-8 transition-left duration-700';
const PC_MENU = 'lg:static lg:w-full lg:flex-row lg:justify-center gap-x-12 lg:p-0';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, login, logout } = useUserContext();
  const menu = ['New', 'Men', 'Women', 'Kids', 'Sale', 'Polo', 'Sneakers', 'Collections', 'We are Lacoste'];

  return (
    <header className="sticky top-0 bg-white px-4 lg:px-6">
      <div className="h-16 lg:h-24 flex lg:justify-center items-center">
        <GoThreeBars className="block lg:hidden text-2xl mr-4" onClick={() => setIsOpen(true)} />
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
      <ul className={`${MOBILE_MENU} ${PC_MENU} ${isOpen ? 'left-0' : '-left-full'}`}>
        <TfiClose className="lg:hidden self-end mb-12" onClick={() => setIsOpen(false)} />
        {menu.map((item, index) => (
          <li className="font-semibold whitespace-nowrap py-4" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </header>
  );
}
