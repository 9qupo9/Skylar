import React from 'react';

const Wallet = ({ isWalletConnected, userBalance, diamondBalance, specialBalance, connectWallet, setUserBalance, setDiamondBalance, setSpecialBalance, disconnectWallet }) => {
  const rightSectionStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  };

  const balanceStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(139, 92, 246, 0.1)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '20px',
    padding: '8px 15px',
    fontSize: '14px',
    fontWeight: '600'
  };

  const buttonStyles = {
    background: 'linear-gradient(45deg, #8B5CF6, #7C3AED)',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 16px',
    color: 'white',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px'
  };

  return (
    <div style={rightSectionStyles}>
      {!isWalletConnected ? (
        <button 
          style={{
            ...buttonStyles,
            background: 'linear-gradient(45deg, #8B5CF6, #7C3AED)',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '700',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transform: 'scale(1)',
            transition: 'all 0.3s ease'
          }}
          onClick={connectWallet}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.4)';
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <div style={balanceStyles}>
            <img src="/Money.png" alt="LINA" style={{ width: '40px', height: '40px' }} />
            <span style={{ color: '#8B5CF6' }}>{userBalance.toFixed(2)} LINA</span>
          </div>
          
          {/* Diamond Balance */}
          <div style={balanceStyles}>
            <img src="/Money.png" alt="Diamond" style={{ width: '40px', height: '40px' }} />
            <span style={{ color: '#8B5CF6' }}>{diamondBalance.toFixed(2)}</span>
            {diamondBalance > 0 && (
              <button
                style={{
                  ...buttonStyles,
                  padding: '6px 10px',
                  fontSize: '16px',
                  marginLeft: '10px'
                }}
                onClick={() => {
                  setUserBalance(prev => prev + diamondBalance);
                  setDiamondBalance(0);
                }}
              >
                Sell
              </button>
            )}
          </div>
          
          {/* Special Balance */}
          <div style={balanceStyles}>
            <img src="/Box.png" alt="Special" style={{ width: '40px', height: '40px' }} />
            <span style={{ color: '#8B5CF6' }}>{specialBalance.toFixed(2)}</span>
            {specialBalance > 0 && (
              <button
                style={{
                  ...buttonStyles,
                  padding: '6px 10px',
                  fontSize: '16px',
                  marginLeft: '10px'
                }}
                onClick={() => {
                  setUserBalance(prev => prev + specialBalance);
                  setSpecialBalance(0);
                }}
              >
                Sell
              </button>
            )}
          </div>
          
          {/* Disconnect Button */}
          <button
            style={{
              ...buttonStyles,
              background: 'linear-gradient(45deg, #ef4444, #dc2626)',
              padding: '6px 12px',
              fontSize: '18px'
            }}
            onClick={disconnectWallet}
          >
            Disconnect
          </button>
        </>
      )} 
    </div>
  );
};

export default Wallet;