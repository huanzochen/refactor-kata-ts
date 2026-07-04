import { createRoot } from 'react-dom/client';
import { Sidebar } from './katas/02-use-resizable/Sidebar';

function Demo() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: 24, fontFamily: 'sans-serif' }}>
        <h1>Kata 2 — useResizable demo</h1>
        <p>抓住側欄右邊緣拖曳。觀察：拖曳中 handle 變藍、寬度緊跟滑鼠（transition 關閉）。</p>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<Demo />);
