import React from 'react';

function Error({ statusCode }) {
  return (
    <div style={{ 
      padding: '100px 20px', 
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>
        {statusCode
          ? `Error ${statusCode}`
          : 'An error occurred on client'}
      </h1>
      <p>Sorry, something went wrong.</p>
      <div style={{ marginTop: '30px' }}>
        <a 
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
        </a>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error; 