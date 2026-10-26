import "@testing-library/jest-dom/vitest";

globalThis.ResizeObserver = class implements ResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    void callback;
  }

  observe(_target: Element) {}
  unobserve(_target: Element) {}
  disconnect() {}
};

Element.prototype.scrollIntoView = () => {};

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => {},
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
