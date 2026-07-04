import { useToggle } from './useToggle';

/**
 * 三個獨立布林開關，共用 useToggle 消除重複的 toggle 邏輯。
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
