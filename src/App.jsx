import React, { useState } from 'react';
import Header from './components/Header';
import ChestDisplay from './components/ChestDisplay';
import RewardSystem from './components/RewardSystem';
import Footer from './components/Footer';
import Wallet from './components/Wallet';

const App = () => {
  const [currentView, setCurrentView] = useState('chest');
  const [userBalance, setUserBalance] = useState(100.00);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [diamondBalance, setDiamondBalance] = useState(0);
  const [specialBalance, setSpecialBalance] = useState(0);
  const [pendingRewards, setPendingRewards] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const connectWallet = async () => {
    // Wallet connection simulation
    setIsWalletConnected(true);
    setWalletAddress('0x1234...5678');
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress('');
    setUserBalance(100.00);
    setDiamondBalance(0);
    setSpecialBalance(0);
    setInventory([]);
  };

  const addToInventory = (reward) => {
    const actualValue = reward.value * (reward.multiplier || 1);
    
    // Don't update balances here - they are already updated in RouletteGame
    // Only add to inventory
    setInventory(prev => {
      const baseValue = reward.value; // Base value without multiplier
      const existing = prev.find(item => item.type === reward.type && item.baseValue === baseValue && item.multiplier === (reward.multiplier || 1));
      if (existing) {
        return prev.map(item => 
          item === existing ? {...item, count: item.count + 1} : item
        );
      } else {
        return [...prev, {type: reward.type, value: actualValue, baseValue: baseValue, multiplier: reward.multiplier || 1, count: 1}];
      }
    });
    
    setPendingRewards(prev => prev.filter(r => r.id !== reward.id));
  };

  const sellReward = (reward) => {
    const actualValue = reward.value * (reward.multiplier || 1);
    setUserBalance(prev => prev + actualValue);
    setPendingRewards(prev => prev.filter(r => r.id !== reward.id));
  };

  const appStyles = {
    minHeight: '100vh',
    background: 'url("/Fon.png") center/cover no-repeat, linear-gradient(135deg, #0a0e1a 0%, #1a1f2e 50%, #0a0e1a 100%)',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column'
  };

  const mainContentStyles = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '20px',
    width: '100%'
  };

  return (
    <div style={appStyles}>
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        userBalance={userBalance}
        isWalletConnected={isWalletConnected}
        walletAddress={walletAddress}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        setUserBalance={setUserBalance}
        diamondBalance={diamondBalance}
        specialBalance={specialBalance}
        setDiamondBalance={setDiamondBalance}
        setSpecialBalance={setSpecialBalance}
        showWalletModal={showWalletModal}
        setShowWalletModal={setShowWalletModal}
        />
      
      <main style={mainContentStyles}>
        {currentView === 'chest' && (
          <ChestDisplay 
            userBalance={userBalance}
            setUserBalance={setUserBalance}
            inventory={inventory}
            setInventory={setInventory}
            isWalletConnected={isWalletConnected}
            pendingRewards={pendingRewards}
            setPendingRewards={setPendingRewards}
            addToInventory={addToInventory}
            sellReward={sellReward}
            setDiamondBalance={setDiamondBalance}
            setSpecialBalance={setSpecialBalance}
          />
        )}
        
        {currentView === 'inventory' && (
          <RewardSystem 
            inventory={inventory}
            setInventory={setInventory}
            setUserBalance={setUserBalance}
            setDiamondBalance={setDiamondBalance}
            setSpecialBalance={setSpecialBalance}
          />
        )}
      </main>
      
      <Footer />
      
      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1a1f2e 0%, #0a0e1a 100%)',
            border: '2px solid rgba(0, 212, 170, 0.3)',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            transform: 'scale(1)',
            animation: 'modalSlideIn 0.3s ease'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px'
            }}>🔒</div>
            
            <h2 style={{
              color: '#ffffff',
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '15px',
              background: 'linear-gradient(45deg, #00d4aa, #00b894)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Wallet Required</h2>
            
            <p style={{
              color: '#a0a6b8',
              fontSize: '16px',
              lineHeight: '1.5',
              marginBottom: '30px'
            }}>Please connect your wallet to access inventory!</p>
            
            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center'
            }}>
              <button
                style={{
                  background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '12px 24px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.5px'
                }}
                onClick={() => {
                  setShowWalletModal(false);
                  connectWallet();
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Connect Wallet
              </button>
              
              <button
                style={{
                  background: 'rgba(26, 31, 46, 0.8)',
                  border: '2px solid rgba(0, 212, 170, 0.3)',
                  borderRadius: '15px',
                  padding: '12px 24px',
                  color: '#a0a6b8',
                  fontSize: '14px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.5px'
                }}
                onClick={() => setShowWalletModal(false)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.borderColor = 'rgba(0, 212, 170, 0.5)';
                  e.target.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.borderColor = 'rgba(0, 212, 170, 0.3)';
                  e.target.style.color = '#a0a6b8';
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;