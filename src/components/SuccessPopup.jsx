import { useNavigate } from 'react-router-dom';
import { BsBagCheck } from 'react-icons/bs';

export default function SuccessPopup({ onClick }) {
  const navigate = useNavigate();

  return (
    <div className="bg-lightBlack absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-white flex flex-col justify-center items-center p-10">
        <BsBagCheck className="text-4xl" />
        <p className="my-8 text-center text-lg">
          제품이 장바구니에 추가되었습니다.
          <br />
          바로 확인하시겠습니까?
        </p>
        <div className="flex gap-x-2">
          <button className="border-2 border-black p-2" onClick={() => onClick(false)}>
            쇼핑 계속하기
          </button>
          <button className="bg-black text-white p-2" onClick={() => navigate('/cart')}>
            장바구니 보기
          </button>
        </div>
      </div>
    </div>
  );
}
