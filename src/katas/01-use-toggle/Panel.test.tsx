import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Panel } from './Panel';

// 這些測試驗證「行為」，不管你內部是否有抽出 useToggle。
// 只要行為不變，重構前後都應該綠燈。請勿修改本檔。

test('Wi-Fi 預設 off，點一下變 on', async () => {
  render(<Panel />);
  const btn = screen.getByRole('button', { name: /Wi-Fi/ });
  expect(btn).toHaveTextContent('Wi-Fi: off');
  await userEvent.click(btn);
  expect(btn).toHaveTextContent('Wi-Fi: on');
});

test('Bluetooth 預設 on，點一下變 off', async () => {
  render(<Panel />);
  const btn = screen.getByRole('button', { name: /Bluetooth/ });
  expect(btn).toHaveTextContent('Bluetooth: on');
  await userEvent.click(btn);
  expect(btn).toHaveTextContent('Bluetooth: off');
});

test('各開關互不影響', async () => {
  render(<Panel />);
  await userEvent.click(screen.getByRole('button', { name: /Dark Mode/ }));
  expect(screen.getByRole('button', { name: /Dark Mode/ })).toHaveTextContent(
    'Dark Mode: on',
  );
  expect(screen.getByRole('button', { name: /Wi-Fi/ })).toHaveTextContent(
    'Wi-Fi: off',
  );
});
