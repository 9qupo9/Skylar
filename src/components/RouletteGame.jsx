import { useState } from "react"
import { RouletteWheel } from "./RouletteWheel"

const multipliers = ["1x", "2x", "3x", "4x"]

export function RouletteGame({ userBalance, setUserBalance, isWalletConnected, addToInventory, setDiamondBalance, setSpecialBalance }) {
  const [selectedMultiplier, setSelectedMultiplier] = useState("1x")
  const [betAmount] = useState("2.00")
  const [isSpinning, setIsSpinning] = useState(false)
  const [notification, setNotification] = useState(null)


  const showNotification = (message, type = 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleSpin = () => {
    if (!isWalletConnected) {
      showNotification('Connect wallet to play!', 'warning')
      return
    }

    const multiplierValue = parseInt(selectedMultiplier.replace('x', ''))
    const totalCost = parseFloat(betAmount) * multiplierValue
    if (userBalance < totalCost) {
      showNotification('Insufficient balance!', 'error')
      return
    }

    setUserBalance(prev => prev - totalCost)
    setIsSpinning(true)
  }

  const handleResultConfirmed = () => {
    setIsSpinning(false)
  }

  const handleWinningItem = (winningItem) => {
    const value = parseFloat(winningItem.value)

    if (winningItem.type === 'coin') {
      setDiamondBalance(prev => prev + value)
    } else {
      setSpecialBalance(prev => prev + value)
    }

    const reward = {
      id: Date.now() + Math.random(),
      type: winningItem.type === 'coin' ? 'diamond' : 'special',
      value: value,
      multiplier: 1
    }

    if (addToInventory) {
      addToInventory(reward)
    }
  }

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px'
  }

  const titleContainerStyles = {
    textAlign: 'center',
    marginBottom: '48px'
  }

  const titleStyles = {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: '32px'
  }

  const multiplierContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '32px'
  }

  const getMultiplierButtonStyles = (isSelected) => ({
    padding: '12px 24px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    background: isSelected ? '#8B5CF6' : 'rgba(26, 31, 46, 0.8)',
    color: isSelected ? 'white' : '#a0a6b8',
    border: isSelected ? '1px solid #8B5CF6' : '1px solid rgba(160, 166, 184, 0.3)',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600'
  })

  const spinButtonStyles = {
    background: 'linear-gradient(45deg, #8B5CF6, #7C3AED)',
    color: 'white',
    padding: '12px 48px',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    transform: isSpinning ? 'none' : 'scale(1)',
    opacity: isSpinning ? 0.5 : 1,
    cursor: isSpinning ? 'not-allowed' : 'pointer',
    border: 'none',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 5px 15px rgba(139, 92, 246, 0.3)'
  }

  const wheelContainerStyles = {
    marginBottom: '32px'
  }

  return (
    <div style={containerStyles}>
      <div style={titleContainerStyles}>
        <h1 style={titleStyles}>Open case</h1>

        <div style={multiplierContainerStyles}>
          {multipliers.map((multiplier) => (
            <button
              key={multiplier}
              style={getMultiplierButtonStyles(selectedMultiplier === multiplier)}
              onClick={() => setSelectedMultiplier(multiplier)}
              disabled={isSpinning}
            >
              {multiplier}
            </button>
          ))}
        </div>

        <button
          onClick={handleSpin}
          disabled={isSpinning}
          style={spinButtonStyles}
          onMouseEnter={(e) => {
            if (!isSpinning) e.target.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e) => {
            if (!isSpinning) e.target.style.transform = 'scale(1)'
          }}
        >
          {isSpinning ? "SPINNING..." : `Let's GO ${(parseFloat(betAmount) * parseInt(selectedMultiplier.replace('x', ''))).toFixed(2)} LINA`}
        </button>
      </div>

      <div style={wheelContainerStyles}>
        <RouletteWheel 
          isSpinning={isSpinning} 
          onResultConfirmed={handleResultConfirmed}
          onWinningItem={handleWinningItem}
          wheelCount={parseInt(selectedMultiplier.replace('x', ''))}
        />
      </div>

      {notification && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: notification.type === 'error' ? 'linear-gradient(45deg, #ef4444, #dc2626)' : 'linear-gradient(45deg, #f59e0b, #d97706)',
          color: 'white',
          padding: '20px 32px',
          borderRadius: '16px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
          zIndex: 1000,
          fontSize: '16px',
          fontWeight: '600',
          minWidth: '300px',
          textAlign: 'center'
        }}>
          {notification.message}
        </div>
      )}
    </div>
  )
}