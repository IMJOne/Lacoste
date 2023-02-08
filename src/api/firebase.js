import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { get, getDatabase, ref } from 'firebase/database';

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
export const logout = () => signOut(auth).catch(console.error);
export const onUserStateChange = callback => onAuthStateChanged(auth, user => callback(user));
// 로그인 성공 시 유효한 사용자 정보 객체를 반환

export const getProducts = async () => {
  return get(ref(database, 'products')).then(snapshot => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
};
