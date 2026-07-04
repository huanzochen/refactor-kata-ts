import { useState, useRef, useEffect, useCallback } from 'react';
import { useResizeable } from './useResizable';



const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'projects', label: 'Projects', icon: '📁' },
  { id: 'messages', label: 'Messages', icon: '💬' },
  { id: 'calendar', label: 'Calendar', icon: '📅' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

const QUICK_ACTIONS = [
  { id: 'new-project', label: 'New Project', shortcut: '⌘N' },
  { id: 'new-message', label: 'New Message', shortcut: '⌘M' },
  { id: 'new-event', label: 'New Event', shortcut: '⌘E' },
];

interface User {
  name: string;
  email: string;
  role: string;
}

const currentUser: User = {
  name: 'Alex Chen',
  email: 'alex@example.com',
  role: 'Admin',
};

/**
 * 味道：可拖曳寬度的側欄。
 * 拖曳邏輯（useState + useRef + 三個 handler + useEffect 掛/卸全域事件）
 * 全部糾纏在 component 裡。想在別的頁面複用這個拖曳行為？只能複製貼上。
 *
 * 註：這幾乎就是 chartbutton_demo_ 的 Home.tsx 側欄邏輯。練完可直接搬回去用。
 */
export function Sidebar() {

  const {width, onMouseDown: handleMouseDown} = useResizeable({initial: 250, min: 150, max: 500})


  const [activeNav, setActiveNav] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');





  const filteredNav = NAV_ITEMS.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isNarrow = width < 200;

  return (
    <aside
      data-testid="sidebar"
      style={{
        width,
        minWidth: MIN_WIDTH,
        maxWidth: MAX_WIDTH,
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f8fafc',
        transition: isResizing.current ? 'none' : 'width 0.1s ease',
      }}
    >
      {/* Resize handle */}
      <div
        data-testid="resize-handle"
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 4,
          cursor: 'col-resize',
          backgroundColor: isResizing.current ? '#3b82f6' : 'transparent',
        }}
      />

      {/* Header */}
      <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
            {collapsed ? 'A' : 'App Name'}
          </h2>
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
            }}
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {/* Search */}
      {!collapsed && (
        <div style={{ padding: '12px 16px' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 6,
              border: '1px solid #e2e8f0',
              fontSize: 14,
              boxSizing: 'border-box',
            }}
          />
        </div>
      )}

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '8px', overflowY: 'auto' }}>
        {filteredNav.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              width: '100%',
              padding: isNarrow ? '10px 0' : '10px 12px',
              justifyContent: isNarrow ? 'center' : 'flex-start',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 14,
              backgroundColor: activeNav === item.id ? '#dbeafe' : 'transparent',
              color: activeNav === item.id ? '#1d4ed8' : '#334155',
              fontWeight: activeNav === item.id ? 600 : 400,
              marginBottom: 2,
            }}
          >
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            {(!collapsed || !isNarrow) && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Quick Actions */}
      {!collapsed && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: 12, fontWeight: 600, color: '#64748b', margin: '0 0 8px' }}>
            Quick Actions
          </h3>
          {QUICK_ACTIONS.map(action => (
            <button
              key={action.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '6px 0',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: 13,
                color: '#475569',
              }}
            >
              <span>{action.label}</span>
              <kbd
                style={{
                  fontSize: 11,
                  padding: '2px 6px',
                  borderRadius: 4,
                  backgroundColor: '#e2e8f0',
                  color: '#64748b',
                }}
              >
                {action.shortcut}
              </kbd>
            </button>
          ))}
        </div>
      )}

      {/* User profile */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {currentUser.name[0]}
        </div>
        {(!collapsed || !isNarrow) && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>
              {currentUser.name}
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>{currentUser.role}</div>
          </div>
        )}
      </div>
    </aside>
  );
}
