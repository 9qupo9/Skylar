import React from 'react';



const Footer = () => {
  const footerStyles = {
    background: 'rgba(10, 14, 26, 0.95)',
    borderTop: '1px solid rgba(26, 31, 46, 0.5)',
    padding: '20px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto'
  };

  const copyrightStyles = {
    color: '#666',
    fontSize: '12px',
    letterSpacing: '0.5px'
  };

  const socialLinksStyles = {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  };

  const socialIconStyles = {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '16px',
    textDecoration: 'none'
  };

const socialIcon = {
  margin: "0 8px",
  fontSize: "24px",
  color: "gray",                  // default gray
        transition: "color 0.3s ease"   // smooth transition
};


  return (

    <footer style={footerStyles}>
      <div style={copyrightStyles}>
        © 2025 Skylar All rights reserved.
      </div>
      
      <div style={{ color: '#a0a6b8', fontSize: '12px', letterSpacing: '0.5px' }}>
        Powered by{' '}
        <a
          href="https://twitter.com/UnityNodes"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#8B5CF6', textDecoration: 'none', fontWeight: 'bold' }}
        >
          Unity Nodes
        </a>
      </div>
    </footer>
  );
};

export default Footer;