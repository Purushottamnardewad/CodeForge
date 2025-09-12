import React from 'react';

const DebugInfo = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'NOT_SET';
  const appName = import.meta.env.VITE_APP_NAME || 'NOT_SET';
  
  // Only show debug info in development mode
  if (import.meta.env.MODE === 'production') {
    return null;
  }
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: '#f0f0f0', 
      padding: '10px', 
      border: '1px solid #ccc',
      fontSize: '12px',
      zIndex: 9999
    }}>
      <h4>Debug Info:</h4>
      <p><strong>API URL:</strong> {apiUrl}</p>
      <p><strong>App Name:</strong> {appName}</p>
      <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
    </div>
  );
};

export default DebugInfo;
