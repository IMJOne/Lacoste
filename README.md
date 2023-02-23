![lacoste](https://user-images.githubusercontent.com/110226567/217969068-c8139fb6-46b8-48cb-b451-e3e480a4d62a.png)

# 🐊 Lacoste

라코스테 공식 온라인 부티크 👉 [Demo](https://jone-lacoste.netlify.app)

<br />

## 📢 프로젝트 개요

라코스테 공식 웹사이트의 디자인을 참고하여 진행한 온라인 쇼핑몰 프로젝트입니다.<br />
단순히 제품을 보여주는 것만이 아닌, 장바구니를 통해 실제로 서비스를 이용하는 것 같은 느낌을 주고 싶었습니다.<br />
이를 위해 데이터의 변경 사항이 실시간으로 화면상에 바로 업데이트되는 부분에 초점을 맞추고 기능을 구현하였습니다.

<br />

## 🗨️ 사용 기술

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=ReactRouter&logoColor=white"/>
  <img src="https://img.shields.io/badge/React Query-FF4154?style=flat-square&logo=ReactQuery&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=white"/>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white"/>
</p>

<br />

## 📋 주요 기능

- 구글 계정 로그인
- 제품 전체 리스트
- 제품 상세 페이지
- 장바구니 서비스
- 데이터베이스 연동

<br />

## 💻 소스 코드

전체 코드 보러 가기 👉 [Notion](https://imjone.notion.site/Lacoste-9d78c5adf550498580463c0f9d0d82eb)

### 📍 파이어베이스 세팅

파이어베이스 초기 설정 및 데이터베이스 관련 API를 요청하는 곳입니다.<br />
전달 받은 인자를 바탕으로 가져오고 싶은 데이터베이스의 reference를 명시합니다.

```javascript
// firebase.js

const app = initializeApp(firebaseConfig); // 파이어베이스 초기화
const database = getDatabase(app);

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
  const productInfo = `${product.title} ${product.color} ${product.size}`;
  return set(ref(database, `carts/${userId}/${productInfo}`), product);
};

export const removeFromCart = async (userId, product) => {
  const productInfo = `${product.title} ${product.color} ${product.size}`;
  return remove(ref(database, `carts/${userId}/${productInfo}`));
};
```

### 📍 커스텀훅 사용

`useQuery`의 특성상 데이터를 stale하다고 간주하기 때문에,<br />
`useMutate`를 사용하여 변경 사항이 화면 상에도 바로 업데이트되도록 해주었습니다.

```javascript
export default function useCart() {
  const { uid } = useUserContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery(['carts', uid || ''], () => getCart(uid), {
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation(product => addOrUpdateCart(uid, product), {
    // 현재 사용자의 uid에 관한 캐시만 invalidate
    onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
  });

  const removeItem = useMutation(id => removeFromCart(uid, id), {
    onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
  });

  return { cartQuery, addOrUpdateItem, removeItem };
}
```

<br />

## 😊 배운 점 및 느낀 점

- 파일들을 보관하고, 데이터베이스를 연동하여 실시간으로 통신하는 경험을 해볼 수 있었습니다.
- 어떤 상황에서 어떤 식으로 커스텀훅을 작성하여 사용할 수 있는지 감을 익힐 수 있었습니다.
- R키워드 단위로 검색하여 모르는 부분에 대해 빠르게 찾아나가는 요령을 익힐 수 있었습니다.
- React Query의 캐싱 전략 및 제대로 된 사용법을 다시 공부해야겠다고 느꼈습니다.
