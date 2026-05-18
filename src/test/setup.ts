import "@testing-library/jest-dom/vitest";

// jsdom does not implement IntersectionObserver — Header relies on it.
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

(globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
  MockIntersectionObserver;
(window as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
  MockIntersectionObserver;

// jsdom lacks rAF in older shims — provide a deterministic fallback.
if (typeof window.requestAnimationFrame !== "function") {
  window.requestAnimationFrame = (cb: FrameRequestCallback) =>
    window.setTimeout(() => cb(performance.now()), 0) as unknown as number;
  window.cancelAnimationFrame = (id: number) => window.clearTimeout(id);
}

// jsdom doesn't implement scrollTo on window.
window.scrollTo = (() => {}) as typeof window.scrollTo;
