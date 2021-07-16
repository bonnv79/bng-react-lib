
import React from 'react';

const FormLabel = ({ children, label, style }) => (
  <div style={{ display: 'flex', marginBottom: 8, ...style }}>
    {
      label && (
        <div
          style={{
            marginRight: 10,
            color: '#bdbdbd',
            fontSize: '0.8em',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {label}
        </div>
      )
    }
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        fontSize: '0.9em'
      }}
    >
      {children}
    </div>
  </div>
)

export default FormLabel;