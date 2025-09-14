# Rock Paper Scissors Game 🪨 📄 ✂️

A modern, interactive Rock Paper Scissors game built with vanilla JavaScript and Vite.

## Features

- 🎮 Interactive game interface with beautiful UI
- 🤖 AI opponent with random choice selection
- 📊 Real-time score tracking
- 🔄 Customizable number of rounds (1-20)
- 📱 Responsive design for mobile and desktop
- 🎨 Modern gradient design with smooth animations

## How to Play

1. Choose how many rounds you want to play (1-20)
2. Click "Start Game" to begin
3. Select your move: Rock 🪨, Paper 📄, or Scissors ✂️
4. Watch the AI make its choice
5. See who wins each round
6. Play continues until all rounds are complete
7. View the final game result

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd rock_paper_scissors
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and go to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
rock_paper_scissors/
├── src/
│   ├── components/
│   │   ├── GameSetup.js      # Setup screen component
│   │   └── GameBoard.js      # Main game interface
│   ├── App.js                # Main application orchestrator
│   ├── gameLogic.js          # Game logic and rules
│   ├── main.js               # Application entry point
│   └── style.css             # Styling and animations
├── index.html                # HTML entry point
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## Architecture

The game follows a clean separation of concerns:

- **Game Logic** (`gameLogic.js`): Handles game rules, AI decisions, and score tracking
- **Components** (`components/`): Reusable UI components for different game states
- **App** (`App.js`): Main application controller that manages state and component lifecycle
- **Styling** (`style.css`): Modern CSS with gradients, animations, and responsive design

## Technologies Used

- **Vanilla JavaScript** (ES6+ modules)
- **Vite** (build tool and dev server)
- **CSS3** (modern styling with gradients and animations)
- **HTML5** (semantic markup)

## Browser Support

This game works in all modern browsers that support:
- ES6 modules
- CSS Grid and Flexbox
- CSS custom properties

## License

This project is open source and available under the MIT License.
