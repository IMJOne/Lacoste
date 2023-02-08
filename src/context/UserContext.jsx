import { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';

// Context 생성
const UserContext = createContext();

// Context 공급
export function UserContextProvider({ children }) {
  const [user, setUser] = useState();

  // 컴포넌트 최초 렌더링 시 로그인, 로그아웃 여부에 따라
  // onUserStateChange 함수로부터 적절한 정보를 전달 받음
  // 전달 받은 사용자 정보를 컴포넌트의 초기 상태값으로 세팅
  useEffect(() => onUserStateChange(setUser), []);

  return <UserContext.Provider value={{ user, uid: user && user.uid, login, logout }}>{children}</UserContext.Provider>;
}

// Context 사용
export function useUserContext() {
  return useContext(UserContext);
}
