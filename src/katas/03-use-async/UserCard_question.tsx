import { useState, useEffect } from 'react';

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
export function UserCard({ fetchUser }: { fetchUser: () => Promise<User> }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchUser()
      .then((u) => {
        if (!cancelled) setUser(u);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [fetchUser]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div role="alert">Error: {error}</div>;
  if (user) return <div>Hello, {user.name}</div>;
  return null;
}
