# Skylar - React Chest Game Interface

**Project Overview:**
Skylar is an interactive gaming interface, developed using React.js, that simulates a chest or roulette-style game system. The application allows users to participate in the game, manage their in-game balance, connect a virtual wallet, and handle an inventory of acquired rewards. The primary focus is on a smooth user experience with a dynamic interface and clear game mechanics.

**Key Features:**

*   **Interactive Chest Game (Roulette-style):** Users can spin a wheel to win various items.
*   **User Balance Management:** Tracks the user's main balance (LINA), as well as separate balances for diamonds and special items.
*   **Virtual Wallet Integration:** Allows users to connect and disconnect a virtual wallet, displaying the corresponding address and balances.
*   **Inventory System:** Users can view their acquired rewards, add them to their inventory, and sell them for LINA.
*   **Multiplier-based Betting:** Players can select multipliers (1x, 2x, 3x, 4x) which influence the spin cost and potential rewards.
*   **Dynamic UI and Notifications:** The application provides feedback through notifications for game states, such as insufficient balance or wallet connection required.
*   **Animated Roulette Wheel:** A visually engaging wheel spin animation with support for multiple wheels for simultaneous spins.

**Technology Stack:**

*   **Frontend:** React.js
*   **Styling:** Inline styles and CSS animations.

**Component Structure:**

*   `App.jsx`: The main application component, managing global state (balances, wallet connection, inventory, current view) and routing between the game screen and inventory.
*   `Header.jsx`: Displays the "Skylar" logo, project title, and integrates the `Wallet` component for persistent display of wallet information and balances.
*   `Footer.jsx`: Contains copyright information and "Powered by Unity Nodes" attribution.
*   `ChestDisplay.jsx`: A wrapper component that passes necessary props to the `RouletteGame` component.
*   `RouletteGame.jsx`: Implements the core game logic. It manages multiplier selection, betting, spin state, processes spin results, and interacts with user balances and inventory.
*   `RouletteWheel.jsx`: Responsible for the visualization and animation of the roulette wheel. It selects random winning items, animates the spin, and triggers callbacks for result handling. Supports displaying multiple wheels.
*   `RewardSystem.jsx`: Displays the user's inventory in a grid format, allowing viewing and selling of acquired items (diamonds and special items).
*   `Wallet.jsx`: Manages the connection/disconnection of a virtual wallet and displays various user balances (LINA, diamonds, special items). Provides functionality to sell diamonds and special items for LINA.

**Game Mechanics:**

1.  **Multiplier Selection:** User selects a multiplier (1x, 2x, 3x, 4x) which determines the spin cost.
2.  **Betting:** A fixed bet amount is multiplied by the selected multiplier to get the total spin cost.
3.  **Spin:** Upon clicking the "Let's GO" button, the roulette wheel animation is initiated.
4.  **Item Winnings:** After the wheel stops, a winning item (chest or coin) is determined.
5.  **Inventory:** Won items are added to the user's inventory. Coins increase the diamond balance, and chests increase the special item balance.
6.  **Item Selling:** Users can sell items from their inventory to replenish their main LINA balance.

**Assets Used:**

*   `Box.png`: Image for chests/special items.
*   `Money.png`: Image for coins/diamonds and LINA currency.
*   `Skylar.png`: Project logo.
*   `Fon.png`: Application background image.
*   `String.png`: Image for roulette wheel indicators.

Developed by 9qupo9.