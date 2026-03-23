import React from 'react';

const RewardSystem = ({ inventory, setInventory, setUserBalance, setDiamondBalance, setSpecialBalance }) => {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    minHeight: '60vh',
    color: '#a0a6b8'
  };

  const titleStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: '20px'
  };

  const inventoryGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '800px'
  };

  const itemStyles = {
    background: 'rgba(26, 31, 46, 0.8)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '8px',
    padding: '15px',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  };

  const sellItem = (item, index) => {
    const newInventory = [...inventory];
    newInventory.splice(index, 1);
    setInventory(newInventory);
    
    // Add value only to main balance, not to specific balances
    setUserBalance(prev => prev + item.value);
  };

  return (
    <div style={containerStyles}>
      <h2 style={titleStyles}>Inventory</h2>
      
      {inventory.length === 0 ? (
        <div style={{ textAlign: 'center', fontSize: '18px' }}>
          <p>Your inventory is empty</p>
          <p style={{ fontSize: '14px', marginTop: '10px' }}>Open some cases to get items!</p>
        </div>
      ) : (
        <div style={inventoryGridStyles}>
          {inventory.map((item, index) => (
            <div key={index} style={itemStyles}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>
                {item.type === 'special' ? (
                  <img src="/Money.png" alt="LINA" style={{ width: '40px', height: '40px' }} />
                ) : (
                  <img src="/Box.png" alt="Box" style={{ width: '40px', height: '40px' }} />
                )}
              </div>
              <div style={{ color: '#8B5CF6', fontWeight: '600', marginBottom: '5px' }}>
                {item.value.toFixed(2)} LINA
              </div>
              <div style={{ fontSize: '12px', marginBottom: '10px' }}>
                {item.type === 'special' ? 'Special' : 'Diamond'}
              </div>
              <button
                onClick={() => sellItem(item, index)}
                style={{
                  background: 'linear-gradient(45deg, #8B5CF6, #7C3AED)',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '5px 10px',
                  color: 'white',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Sell
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RewardSystem;