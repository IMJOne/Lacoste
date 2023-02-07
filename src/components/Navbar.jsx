import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { login, logout, onUserStateChange } from '../api/firebase';
import User from './User';

export default function Navbar() {
  const [user, setUser] = useState();

  // 컴포넌트 최초 렌더링 시 로그인, 로그아웃 여부에 따라
  // onUserStateChange 함수로부터 적절한 정보를 전달 받음
  // 전달 받은 사용자 정보를 컴포넌트의 초기 상태값으로 세팅
  useEffect(() => onUserStateChange(setUser), []);

  const menu = ['New', 'Men', 'Women', 'Kids', 'Sale', 'Polo', 'Sneakers', 'Collections', 'We are Lacoste'];

  return (
    <header className="sticky top-0 bg-white px-4 lg:px-6">
      <div className="h-20 lg:h-32 flex lg:justify-center items-center">
        <Link to={'/'}>
          <img className="w-40 lg:w-64" src="images/logo.png" alt="라코스테" />
        </Link>
        <div className="absolute right-4 lg:right-6 flex justify-end items-center gap-x-4">
          <Link to={'/cart'}>
            <img src="images/cart.png" alt="장바구니" />
          </Link>
          <button className="flex items-center gap-x-2" onClick={() => (user ? logout() : login())}>
            <img src="images/person.png" alt="로그인" />
            <span className="text-xs font-sans">
              {!user && '로그인'}
              {user && '로그아웃'}
            </span>
            {user && <User user={user} />}
          </button>
        </div>
      </div>
      <ul className="flex justify-center gap-x-10 pb-8 overflow-auto">
        {menu.map((item, index) => (
          <li className="whitespace-nowrap" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </header>
  );
}
