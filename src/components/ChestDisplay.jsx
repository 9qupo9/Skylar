import React from 'react';
import { RouletteGame } from './RouletteGame';

const ChestDisplay = ({ userBalance, setUserBalance, setInventory, isWalletConnected, pendingRewards, setPendingRewards, addToInventory, sellReward, setDiamondBalance, setSpecialBalance }) => {
  return (
    <RouletteGame 
      userBalance={userBalance}
      setUserBalance={setUserBalance}
      isWalletConnected={isWalletConnected}
      addToInventory={addToInventory}
      setDiamondBalance={setDiamondBalance}
      setSpecialBalance={setSpecialBalance}
    />
  );
};

export default ChestDisplay;