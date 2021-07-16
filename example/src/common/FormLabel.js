
import React from 'react';

const FormLabel = ({ children, label, style }) => (
  <div style={{ display: 'flex', marginBottom: 8, ...style }}>
    {
      label && (
        <div style={{ marginRight: 10 }}>
          {label}
        </div>
      )
    }
    <div style={{ flex: 1 }}>
      {children}
    </div>
  </div>
)

export default FormLabel;