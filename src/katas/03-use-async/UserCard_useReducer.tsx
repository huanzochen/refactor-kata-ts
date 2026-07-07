import { useEffect, useReducer } from 'react';

export interface User {
  id: number;
  name: string;
}

/**
 * 味道：三個彼此相關卻各自為政的 useState（data / loading / error）。
 * 沒有東西保證它們一致 —— 例如「error 已設定但 loading 忘了關」這種
 * 不合法組合，型別上完全允許。狀態轉換散落在 then/catch/finally 裡，
 * 很難一眼看出「到底可能有哪幾種狀態」。
 *
 * fetchUser 由 prop 注入，方便測試（不用碰真的網路）。
 */

type AsyncState<T> = {
  isLoading: boolean;
  data: T | null;
  error: Error | null;
};

type AsyncAction<T> =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: T }
  | { type: 'FETCH_ERROR'; payload: Error };

function reducer<T>(state: AsyncState<T>, action: AsyncAction<T>): AsyncState<T> {
  switch (action.type) {
    case 'FETCH_START':
      return { isLoading: true, error: null, data: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    default:
      // 把不可能發生的 action 賦予給 never 型別的變數
      const _exhaustiveCheck: never = action;
      // 如果未來新增了 action type 但忘記寫 case，上面那行就會報錯！
      throw new Error(`Unhandled action type`);
  }
}

export function UserCard({ fetchUser }: { fetchUser: () => Promise<User> }) {
  const initialState: AsyncState<User> = {
    isLoading: false,
    data: null,
    error: null,
  };
  // 3. 在元件中使用
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isLoading, data: user, error } = state;

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: 'FETCH_START' });
    fetchUser()
      .then((u) => {
        if (!cancelled) dispatch({ type: 'FETCH_SUCCESS', payload: u });
      })
      .catch((e) => {
        if (!cancelled)
          dispatch({ type: 'FETCH_ERROR', payload: e instanceof Error ? e : new Error(String(e)) });
      });
    return () => {
      cancelled = true;
    };
  }, [fetchUser]);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div role="alert">
        Error: {error.name}:{error.message}
      </div>
    );
  if (user) return <div>Hello, {user.name}</div>;
  return null;
}
