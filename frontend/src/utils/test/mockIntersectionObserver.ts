type IntersectionObserverConstructor = {
  new (
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit | undefined,
  ): IntersectionObserver;
  prototype: IntersectionObserver;
};

let intersectionObserver: IntersectionObserverConstructor;

export const mockIntersectionObserver = () => {
  intersectionObserver = window.IntersectionObserver;
  // @ts-ignore
  window.IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));
};

export const restoreMockIntersectionObserver = () => {
  window.IntersectionObserver = intersectionObserver;
};
