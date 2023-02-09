import { TbError404 } from 'react-icons/tb';
import { Link } from 'react-router-dom';

export default function NotFount() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <TbError404 className="text-9xl" />
      <h1 className="text-2xl font-semibold">페이지를 찾을 수 없습니다.</h1>
      <p className="text-center my-6">
        페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
        <br />
        입력하신 주소가 정확한지 다시 한 번 확인해주세요.
      </p>
      <div>
        <Link className="block bg-black text-white px-8 py-4" to={'/'}>
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}
