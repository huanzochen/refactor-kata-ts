import { useState } from 'react';

/**
 * 味道：三個獨立的布林開關，每一個都手刻一份一模一樣的 toggle 邏輯。
 * 三份 useState + 三份 `(v) => !v`，改一個要記得改三個。
 */
export function Panel() {
  const [wifi, setWifi] = useState(false);
  const [bluetooth, setBluetooth] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <button onClick={() => setWifi((v) => !v)}>
        Wi-Fi: {wifi ? 'on' : 'off'}
      </button>
      <button onClick={() => setBluetooth((v) => !v)}>
        Bluetooth: {bluetooth ? 'on' : 'off'}
      </button>
      <button onClick={() => setDarkMode((v) => !v)}>
        Dark Mode: {darkMode ? 'on' : 'off'}
      </button>
    </div>
  );
}
