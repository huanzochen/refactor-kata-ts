import { render, screen, waitFor } from '@testing-library/react';
import { UserCard } from './UserCard';

// 驗證三種對外可見狀態：載入中 / 成功 / 失敗。
// 不管你用三個 useState、一個 useReducer，還是抽出的 useAsync，行為都該一致。
// 請勿修改本檔。

test('資料還沒回來時顯示 Loading', () => {
  render(<UserCard fetchUser={() => new Promise<never>(() => {})} />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('成功後顯示使用者名稱', async () => {
  render(<UserCard fetchUser={async () => ({ id: 1, name: 'Ada' })} />);
  await waitFor(() =>
    expect(screen.getByText('Hello, Ada')).toBeInTheDocument(),
  );
});

test('失敗後顯示錯誤訊息', async () => {
  render(
    <UserCard
      fetchUser={async () => {
        throw new Error('boom');
      }}
    />,
  );
  await waitFor(() =>
    expect(screen.getByRole('alert')).toHaveTextContent('boom'),
  );
});

test('成功後不應同時殘留 Loading', async () => {
  render(<UserCard fetchUser={async () => ({ id: 2, name: 'Grace' })} />);
  await waitFor(() =>
    expect(screen.getByText('Hello, Grace')).toBeInTheDocument(),
  );
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
});
