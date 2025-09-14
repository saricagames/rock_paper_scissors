// Game Setup Component
export class GameSetup {
    constructor(onStartGame) {
        this.onStartGame = onStartGame;
        this.element = null;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'game-setup';
        this.element.innerHTML = `
      <div class="setup-container">
        <h1>🪨 📄 ✂️ Rock Paper Scissors</h1>
        <p>Welcome to Rock Paper Scissors! How many rounds would you like to play?</p>
        
        <div class="rounds-input">
          <label for="rounds">Number of rounds:</label>
          <input type="number" id="rounds" min="1" max="20" value="3" />
        </div>
        
        <button id="start-game" class="start-button">Start Game</button>
      </div>
    `;

        this.attachEventListeners();
        return this.element;
    }

    attachEventListeners() {
        const startButton = this.element.querySelector('#start-game');
        const roundsInput = this.element.querySelector('#rounds');

        startButton.addEventListener('click', () => {
            const rounds = parseInt(roundsInput.value);
            if (rounds >= 1 && rounds <= 20) {
                this.onStartGame(rounds);
            } else {
                alert('Please enter a number between 1 and 20');
            }
        });

        // Allow Enter key to start game
        roundsInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                startButton.click();
            }
        });
    }

    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}
