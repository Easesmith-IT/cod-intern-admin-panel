// Utility to prevent Chrome extension interference with API calls

export const initializeExtensionProtection = () => {
  // Prevent extensions from intercepting fetch requests
  if (typeof window !== 'undefined') {
    // Store original fetch
    const originalFetch = window.fetch;
    
    // Override fetch to add protection headers
    window.fetch = function(url, options = {}) {
      const enhancedOptions = {
        ...options,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Cache-Control': 'no-cache',
          ...options.headers
        }
      };
      
      return originalFetch(url, enhancedOptions)
        .catch(error => {
          // Check if error is from extension
          if (error.message?.includes('runtime.lastError') || 
              error.message?.includes('message port closed')) {
            console.warn('Extension interference with fetch detected');
            // Retry once
            return originalFetch(url, enhancedOptions);
          }
          throw error;
        });
    };

    // Suppress extension-related console errors
    const originalConsoleError = console.error;
    console.error = function(...args) {
      const message = args[0];
      if (typeof message === 'string' && 
          (message.includes('runtime.lastError') || 
           message.includes('message port closed'))) {
        // Log as warning instead of error
        console.warn('Extension error (suppressed):', ...args);
        return;
      }
      originalConsoleError.apply(console, args);
    };

    // Handle unhandled promise rejections from extensions
    window.addEventListener('unhandledrejection', (event) => {
      if (event.reason?.message?.includes('runtime.lastError') || 
          event.reason?.message?.includes('message port closed')) {
        console.warn('Extension promise rejection (handled):', event.reason);
        event.preventDefault(); // Prevent the error from showing in console
      }
    });
  }
};

// Clean up function
export const cleanupExtensionProtection = () => {
  if (typeof window !== 'undefined') {
    // Remove event listeners if needed
    // This can be called in component cleanup
  }
};
