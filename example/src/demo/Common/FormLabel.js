
import React from 'react';

const FormLabel = ({ children, label }) => (
  <div style={{ display: 'flex', marginBottom: 8 }}>
    {
      label && (
        <div style={{ marginRight: 10 }}>
          {label}
        </div>
      )
    }
    <div>
      {children}
    </div>
  </div>
)

export default FormLabel;