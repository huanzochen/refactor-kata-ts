import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from './Sidebar';

// 驗證拖曳「行為」，不管邏輯是留在 component 還是被抽成 useResizable。
// 請勿修改本檔。

function width(): string {
  return (screen.getByTestId('sidebar') as HTMLElement).style.width;
}

test('預設寬度為 250px', () => {
  render(<Sidebar />);
  expect(width()).toBe('250px');
});

test('在 handle 上按住並拖曳，寬度跟著 clientX 改變', () => {
  render(<Sidebar />);
  fireEvent.mouseDown(screen.getByTestId('resize-handle'));
  fireEvent.mouseMove(document, { clientX: 320 });
  expect(width()).toBe('320px');
});

test('寬度被限制在 [150, 500] 之間', () => {
  render(<Sidebar />);
  fireEvent.mouseDown(screen.getByTestId('resize-handle'));
  fireEvent.mouseMove(document, { clientX: 9999 });
  expect(width()).toBe('500px');
  fireEvent.mouseMove(document, { clientX: 10 });
  expect(width()).toBe('150px');
});

test('沒按住 handle 時，移動滑鼠不會改變寬度', () => {
  render(<Sidebar />);
  fireEvent.mouseMove(document, { clientX: 400 });
  expect(width()).toBe('250px');
});

test('放開滑鼠後再移動，寬度不再改變', () => {
  render(<Sidebar />);
  fireEvent.mouseDown(screen.getByTestId('resize-handle'));
  fireEvent.mouseMove(document, { clientX: 300 });
  fireEvent.mouseUp(document);
  fireEvent.mouseMove(document, { clientX: 450 });
  expect(width()).toBe('300px');
});
