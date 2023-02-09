import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addOrUpdateCart, getCart, removeFromCart } from '../api/firebase';
import { useUserContext } from '../context/UserContext';

export default function useCart() {
  const { uid } = useUserContext();
  const queryClient = useQueryClient();

  // 사용자별로 카트 아이템 캐싱이 이루어지도록 uid 지정
  const cartQuery = useQuery(['carts', uid || ''], () => getCart(uid), {
    enabled: !!uid, // 사용자의 아이디가 없는 경우 쿼리가 수행되지 않음
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
