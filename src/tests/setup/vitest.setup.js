import { vi } from 'vitest'

// Silencia errores esperados (throws validados en tests)
vi.spyOn(console, 'error').mockImplementation(() => {})

// matchMedia usado por breakpoints de Vuetify
if (!global.matchMedia) {
  global.matchMedia = () => ({
    matches: false,
    media: '',
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() { return false },
  })
}

// ✅ Polyfill de ResizeObserver (requerido por VProgressCircular, etc.)
class ResizeObserverMock {
  constructor(_cb) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (!global.ResizeObserver) {
  global.ResizeObserver = ResizeObserverMock
}
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  window.ResizeObserver = ResizeObserverMock
}

// RAF básico
if (!global.requestAnimationFrame) {
  global.requestAnimationFrame = cb => setTimeout(cb, 0)
}

