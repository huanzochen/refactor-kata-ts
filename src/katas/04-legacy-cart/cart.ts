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
  switch (action.type) {
    case 'add': {
      const found = state.items.some((it) => it.id === action.id);
      const items = found
        ? state.items.map((item) => (item.id === action.id ? { ...item, qty: item.qty + 1 } : item))
        : [...state.items, { id: action.id, qty: 1 }];

      return { items };
    }
    case 'remove': {
      const items = state.items.filter((it) => it.id !== action.id);
      return { items };
    }
    case 'setQty': {
      const items = state.items.map((item) =>
        item.id === action.id ? { ...item, qty: action.qty } : item
      );
      return { items };
    }
  }
}
