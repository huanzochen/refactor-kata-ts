import { useState } from 'react';
import { useToggle } from './useToggle';

/**
 * 味道：三個獨立的布林開關，每一個都手刻一份一模一樣的 toggle 邏輯。
 * 三份 useState + 三份 `(v) => !v`，改一個要記得改三個。
 */
export function Panel() {
  const [wifi, setWifi] = useToggle(false);
  const [bluetooth, setBluetooth] = useToggle(true);
  const [darkMode, setDarkMode] = useToggle(false);

  return (
    <div>
      <button onClick={setWifi}>
        Wi-Fi: {wifi ? 'on' : 'off'}
      </button>
      <button onClick={setBluetooth}>
        Bluetooth: {bluetooth ? 'on' : 'off'}
      </button>
      <button onClick={setDarkMode}>
        Dark Mode: {darkMode ? 'on' : 'off'}
      </button>
    </div>
  );
}
