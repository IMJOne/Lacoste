import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { get, getDatabase, ref, remove, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig); // 파이어베이스 초기화
const database = getDatabase(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  // 최초 로그인 이후 자동으로 로그인되는 현상 방지
  prompt: 'select_account',
});

export const login = () => signInWithPopup(auth, provider).catch(console.error);
export const logout = () => {
  if (window.confirm('로그아웃 하시겠습니까?')) signOut(auth).catch(console.error);
};

// 로그인 성공 시 유효한 사용자 정보 객체를 반환
export const onUserStateChange = callback => onAuthStateChanged(auth, user => callback(user));

// 가져오고 싶은 데이터베이스의 reference 명시
export const getProducts = async () => {
  return get(ref(database, 'products')).then(snapshot => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
};

export const getCart = async userId => {
  return get(ref(database, `carts/${userId}`)).then(snapshot => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
};

export const addOrUpdateCart = async (userId, product) => {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
};

export const removeFromCart = async (userId, productId) => {
  return remove(ref(database, `carts/${userId}/${productId}`));
};
