'use client';

import { useEffect } from 'react';

export default function ExtensionProtection() {
  useEffect(() => {
    // Initialize extension protection on client side
    if (typeof window !== 'undefined') {
      // Suppress extension-related console errors
      const originalConsoleError = console.error;
      console.error = function(...args) {
        const message = args[0];
        if (typeof message === 'string' && 
            (message.includes('runtime.lastError') || 
             message.includes('message port closed') ||
             message.includes('Extension context invalidated'))) {
          // Log as warning instead of error
          console.warn('Extension error (suppressed):', ...args);
          return;
        }
        originalConsoleError.apply(console, args);
      };

      // Handle unhandled promise rejections from extensions
      const handleExtensionRejection = (event) => {
        if (event.reason?.message?.includes('runtime.lastError') || 
            event.reason?.message?.includes('message port closed') ||
            event.reason?.message?.includes('Extension context invalidated')) {
          console.warn('Extension promise rejection (handled):', event.reason);
          event.preventDefault(); // Prevent the error from showing in console
        }
      };

      window.addEventListener('unhandledrejection', handleExtensionRejection);

      // Cleanup function
      return () => {
        window.removeEventListener('unhandledrejection', handleExtensionRejection);
        console.error = originalConsoleError; // Restore original console.error
      };
    }
  }, []);

  return null; // This component doesn't render anything
}
