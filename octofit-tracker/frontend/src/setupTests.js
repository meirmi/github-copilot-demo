// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom lacks these browser APIs, which the glass components use
if (!window.CSS) window.CSS = {};
window.CSS.supports = window.CSS.supports || (() => false);

window.matchMedia =
  window.matchMedia ||
  (query => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  }));

window.ResizeObserver =
  window.ResizeObserver ||
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

window.IntersectionObserver =
  window.IntersectionObserver ||
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
