/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom/vitest';

import { afterEach } from 'vitest';

import { cleanup } from '@testing-library/react';

global.ResizeObserver = class ResizeObserver {
  #callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.#callback = callback;
  }
  observe() {
    setTimeout(() => {
      this.#callback(
        [
          {
            target: {} as Element,
            contentRect: { width: 200, height: 100 } as DOMRectReadOnly,
            borderBoxSize: [{ inlineSize: 200, blockSize: 100 }],
            contentBoxSize: [{ inlineSize: 200, blockSize: 100 }],
            devicePixelContentBoxSize: [{ inlineSize: 200, blockSize: 100 }],
          } as ResizeObserverEntry,
        ],
        this as ResizeObserver,
      );
    }, 0);
  }
  unobserve() {}
  disconnect() {}
};

afterEach(() => {
  cleanup();
});
