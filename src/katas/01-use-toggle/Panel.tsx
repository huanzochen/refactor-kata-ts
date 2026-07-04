import { useToggle } from './useToggle';

/**
 * 味道：三個獨立的布林開關，每一個都手刻一份一模一樣的 toggle 邏輯。
 * 三份 useState + 三份 `(v) => !v`，改一個要記得改三個。
 */
export function Panel() {
  const [wifi, toggleWifi] = useToggle(false);
  const [bluetooth, toggleBluetooth] = useToggle(true);
  const [darkMode, toggleDarkMode] = useToggle(false);

  return (
    <div>
      <button onClick={toggleWifi}>
        Wi-Fi: {wifi ? 'on' : 'off'}
      </button>
      <button onClick={toggleBluetooth}>
        Bluetooth: {bluetooth ? 'on' : 'off'}
      </button>
      <button onClick={toggleDarkMode}>
        Dark Mode: {darkMode ? 'on' : 'off'}
      </button>
    </div>
  );
}
