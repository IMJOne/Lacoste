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

  return (
    <header className="flex justify-between items-center px-6 h-28">
      <div>
        <img className="w-6 h-6" src="images/bar.png" alt="메뉴" />
      </div>
      <Link to={'/'}>
        <img className="w-64" src="images/logo.png" alt="라코스테" />
      </Link>
      <div className="flex items-center gap-x-4">
        <Link to={'/cart'}>
          <img src="images/cart.png" alt="장바구니" />
        </Link>
        <button className="flex items-center gap-x-2" onClick={() => (user ? logout() : login())}>
          <img src="images/person.png" alt="로그인" />
          <span className="text-xs">
            {!user && '로그인'}
            {user && '로그아웃'}
          </span>
          {user && <User user={user} />}
        </button>
      </div>
    </header>
  );
}
