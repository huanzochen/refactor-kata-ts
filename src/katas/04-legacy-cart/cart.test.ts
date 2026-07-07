import { describe, expect, test } from 'vitest';
import { cartReducer, type CartState } from './cart';

const empty: CartState = { items: [] };

/**
 * 這是「特徵化測試 (Characterization Test)」。
 * 目的不是驗證 code「應該」怎樣，而是釘住它「現在實際」怎樣 —— 讓你敢動它。
 *
 * 下面幾個是示範（已綠）。你的任務：補到足以覆蓋所有分支與邊界，
 * 直到你有把握「改壞任何行為，都會有一個測試變紅」。之後才開始重構 cart.ts。
 */

describe('cartReducer 現況行為', () => {
  test('add 一個不存在的品項 → 新增 qty 1', () => {
    expect(cartReducer(empty, { type: 'add', id: 'a' })).toEqual({
      items: [{ id: 'a', qty: 1 }],
    });
  });

  test('add 已存在的品項 → qty +1', () => {
    const state: CartState = { items: [{ id: 'a', qty: 2 }] };
    expect(cartReducer(state, { type: 'add', id: 'a' })).toEqual({
      items: [{ id: 'a', qty: 3 }],
    });
  });

  test('remove 會移除該品項', () => {
    const state: CartState = {
      items: [
        { id: 'a', qty: 1 },
        { id: 'b', qty: 1 },
      ],
    };
    expect(cartReducer(state, { type: 'remove', id: 'a' })).toEqual({
      items: [{ id: 'b', qty: 1 }],
    });
  });

  // 👇 一個藏起來的「特徵」：setQty 到 0 並不會刪除品項，只是留下 qty:0。
  //    先照實釘住現況。是不是 bug？重構時「先別改」，之後再另開一步討論。
  test('setQty 到 0 → 品項仍在，只是 qty 變 0（現況如此）', () => {
    const state: CartState = { items: [{ id: 'a', qty: 3 }] };
    expect(cartReducer(state, { type: 'setQty', id: 'a', qty: 0 })).toEqual({
      items: [{ id: 'a', qty: 0 }],
    });
  });

  // TODO 換你補：add 不影響其他既有品項的順序與數量
  test('add 不影響其他既有品項的順序與數量', () => {
    const state: CartState = {
      items: [{ id: 'c', qty: 2 }],
    };
    expect(cartReducer(state, { type: 'add', id: 'b' })).toMatchInlineSnapshot(`
      {
        "items": [
          {
            "id": "c",
            "qty": 2,
          },
          {
            "id": "b",
            "qty": 1,
          },
        ],
      }
    `);
  });

  // TODO 換你補：remove 一個不存在的 id 會怎樣？
  test('remove 一個不存在的 id 會怎樣', () => {
    const state: CartState = {
      items: [
        { id: 'b', qty: 1 },
        { id: 'c', qty: 2 },
      ],
    };
    expect(cartReducer(state, { type: 'remove', id: 'a' })).toMatchInlineSnapshot(`
      {
        "items": [
          {
            "id": "b",
            "qty": 1,
          },
          {
            "id": "c",
            "qty": 2,
          },
        ],
      }
    `);
  });
  // TODO 換你補：setQty 一個不存在的 id 會怎樣？
  test('setQty 一個不存在的 id 會怎樣', () => {
    const state: CartState = {
      items: [
        { id: 'b', qty: 1 },
        { id: 'c', qty: 2 },
      ],
    };
    expect(cartReducer(state, { type: 'setQty', id: 'a', qty: 0 })).toMatchInlineSnapshot(`
      {
        "items": [
          {
            "id": "b",
            "qty": 1,
          },
          {
            "id": "c",
            "qty": 2,
          },
        ],
      }
    `);
  });
  // TODO 換你補：setQty 到負數會怎樣？
  test('setQty 到負數會怎樣', () => {
    const state: CartState = {
      items: [
        { id: 'b', qty: 1 },
        { id: 'c', qty: 2 },
      ],
    };
    expect(cartReducer(state, { type: 'setQty', id: 'a', qty: -1 })).toMatchInlineSnapshot(`
      {
        "items": [
          {
            "id": "b",
            "qty": 1,
          },
          {
            "id": "c",
            "qty": 2,
          },
        ],
      }
    `);
  });
});
