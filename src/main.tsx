import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

// Monkey patch to prevent external tracking script errors
// This protects against undefined element.tagName access in auto-engineer.js
if (typeof window !== 'undefined') {
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (typeof listener === 'function') {
      const wrappedListener = function(event: Event) {
        try {
          // Ensure event.target exists and has proper properties
          if (event && event.target) {
            const target = event.target as HTMLElement;
            // Ensure tagName exists before external scripts can access it
            if (!target.tagName && target.nodeType === Node.ELEMENT_NODE) {
              Object.defineProperty(target, 'tagName', {
                get() { return 'DIV'; },
                configurable: true
              });
            }
          }
          return listener.call(this, event);
        } catch (err) {
          console.warn('Event listener error suppressed:', err);
          return undefined;
        }
      };
      return originalAddEventListener.call(this, type, wrappedListener, options);
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
}

// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
  // Suppress known external tracking script errors
  if (event.error?.message?.includes('element.tagName') || 
      event.error?.fileName?.includes('auto-engineer.js')) {
    // Silently prevent this error from propagating
    event.preventDefault();
    return;
  }
  console.error('Global error caught:', event.error);
  // Prevent the error from breaking the app
  event.preventDefault();
});

// Global handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position="top-right" />
    <App />
  </React.StrictMode>,
) 
