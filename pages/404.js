import React from 'react';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{ 
      padding: '100px 20px', 
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <div style={{ marginTop: '30px' }}>
        <Link
          href="/" 
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            borderRadius: '5px',
            textDecoration: 'none'
          }}
        >
          Go back to home
        </Link>
      </div>
    </div>
  );
} 