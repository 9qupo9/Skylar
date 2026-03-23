import React from 'react';
import Wallet from './Wallet';

const Header = ({ currentView, setCurrentView, userBalance, setUserBalance, isWalletConnected, walletAddress, connectWallet, disconnectWallet, diamondBalance, specialBalance, setDiamondBalance, setSpecialBalance, showWalletModal, setShowWalletModal }) => {
  const headerStyles = {
    background: 'rgba(10, 14, 26, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(26, 31, 46, 0.5)',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  };

  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#8B5CF6'
  };

  // Removed logoIconStyles as it's replaced by an image



  const rightSectionStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  };

  return (
    <header style={headerStyles}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '40px'
      }}>
        <div style={logoStyles}>
          <img src="/Skylar.png" alt="Skylar Logo" style={{ width: '80px', height: '80px' }} />
          <span>SKYLAR</span>
        </div>


      </div>

      <div style={rightSectionStyles}>
        <Wallet 
          isWalletConnected={isWalletConnected} 
          userBalance={userBalance} 
          diamondBalance={diamondBalance} 
          specialBalance={specialBalance} 
          connectWallet={connectWallet} 
          disconnectWallet={disconnectWallet}
          setUserBalance={setUserBalance}
          setDiamondBalance={setDiamondBalance}
          setSpecialBalance={setSpecialBalance}
        />
      </div>
    </header>
  ); 
};

export default Header;