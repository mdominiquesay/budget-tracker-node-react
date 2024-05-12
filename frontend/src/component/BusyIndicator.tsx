import React from 'react';

const BusyIndicator: React.FC = () => {
  return (
    <div className="busy-indicator">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default BusyIndicator;
