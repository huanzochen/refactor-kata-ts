export interface CartItem {
  id: string;
  qty: number;
}

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: 'add'; id: string }
  | { type: 'remove'; id: string }
  | { type: 'setQty'; id: string; qty: number };

/**
 * ⚠️ Legacy code：沒有測試、巢狀 if/else、手刻 for 迴圈。
 * 你「不完全理解」它 —— 這正是重點。不要憑直覺就開始改。
 *
 * 先用「特徵化測試」把它現在實際的行為釘住（連奇怪的行為也照實記下來），
 * 有了安全網之後，再開始重構。
 */
export function cartReducer(state: CartState, action: CartAction): CartState {
  if (action.type === 'add') {
    let found = false;
    const items: CartItem[] = [];
    for (let i = 0; i < state.items.length; i++) {
      const it = state.items[i];
      if (it.id === action.id) {
        items.push({ id: it.id, qty: it.qty + 1 });
        found = true;
      } else {
        items.push(it);
      }
    }
    if (!found) {
      items.push({ id: action.id, qty: 1 });
    }
    return { items };
  } else {
    if (action.type === 'remove') {
      const items: CartItem[] = [];
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id !== action.id) {
          items.push(state.items[i]);
        }
      }
      return { items };
    } else {
      const items: CartItem[] = [];
      for (let i = 0; i < state.items.length; i++) {
        const it = state.items[i];
        if (it.id === action.id) {
          items.push({ id: it.id, qty: action.qty });
        } else {
          items.push(it);
        }
      }
      return { items };
    }
  }
}
