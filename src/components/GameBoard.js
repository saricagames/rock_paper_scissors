import { CHOICES } from '../gameLogic.js';

// Game Board Component
export class GameBoard {
    constructor(onChoiceSelect, onNewGame) {
        this.onChoiceSelect = onChoiceSelect;
        this.onNewGame = onNewGame;
        this.element = null;
    }

    render(gameStats) {
        this.element = document.createElement('div');
        this.element.className = 'game-board';

        const { totalRounds, currentRound, userScore, aiScore, gameState } = gameStats;

        this.element.innerHTML = `
      <div class="game-header">
        <h1>🪨 📄 ✂️ Rock Paper Scissors</h1>
        <div class="score-board">
          <div class="score">
            <span class="player">You</span>
            <span class="points">${userScore}</span>
          </div>
          <div class="vs">VS</div>
          <div class="score">
            <span class="player">AI</span>
            <span class="points">${aiScore}</span>
          </div>
        </div>
        <div class="round-info">
          Round ${currentRound + 1} of ${totalRounds}
        </div>
      </div>

      <div class="game-area">
        <div class="choices-container">
          <h2>Choose your move:</h2>
          <div class="choices">
            <button class="choice-btn" data-choice="${CHOICES.ROCK}">
              🪨 Rock
            </button>
            <button class="choice-btn" data-choice="${CHOICES.PAPER}">
              📄 Paper
            </button>
            <button class="choice-btn" data-choice="${CHOICES.SCISSORS}">
              ✂️ Scissors
            </button>
          </div>
        </div>

        <div class="game-status">
          <div id="game-message" class="message"></div>
        </div>
      </div>

      <div class="game-actions">
        <button id="new-game" class="new-game-btn">New Game</button>
      </div>
    `;

        this.attachEventListeners();
        return this.element;
    }

    attachEventListeners() {
        const choiceButtons = this.element.querySelectorAll('.choice-btn');
        const newGameButton = this.element.querySelector('#new-game');

        choiceButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const choice = e.target.dataset.choice;
                this.onChoiceSelect(choice);
            });
        });

        newGameButton.addEventListener('click', () => {
            this.onNewGame();
        });
    }

    updateGameStats(gameStats) {
        if (!this.element) return;

        const { currentRound, totalRounds, userScore, aiScore } = gameStats;

        // Update score display
        const userPoints = this.element.querySelector('.score .points');
        const aiPoints = this.element.querySelectorAll('.score .points')[1];
        const roundInfo = this.element.querySelector('.round-info');

        if (userPoints) userPoints.textContent = userScore;
        if (aiPoints) aiPoints.textContent = aiScore;
        if (roundInfo) roundInfo.textContent = `Round ${currentRound + 1} of ${totalRounds}`;
    }

    showRoundResult(roundData) {
        if (!this.element) return;

        const messageElement = this.element.querySelector('#game-message');
        const { userChoice, aiChoice, result } = roundData;

        const choiceEmojis = {
            [CHOICES.ROCK]: '🪨',
            [CHOICES.PAPER]: '📄',
            [CHOICES.SCISSORS]: '✂️'
        };

        const resultMessages = {
            win: 'You win this round! 🎉',
            lose: 'AI wins this round! 🤖',
            tie: 'It\'s a tie! 🤝'
        };

        messageElement.innerHTML = `
      <div class="round-result">
        <div class="choices-display">
          <div class="choice">
            <span class="emoji">${choiceEmojis[userChoice]}</span>
            <span class="label">You chose ${userChoice}</span>
          </div>
          <div class="vs">VS</div>
          <div class="choice">
            <span class="emoji">${choiceEmojis[aiChoice]}</span>
            <span class="label">AI chose ${aiChoice}</span>
          </div>
        </div>
        <div class="result-message">${resultMessages[result]}</div>
      </div>
    `;
    }

    showGameOver(finalResult) {
        if (!this.element) return;

        const messageElement = this.element.querySelector('#game-message');
        messageElement.innerHTML = `
      <div class="game-over">
        <h2>Game Over!</h2>
        <div class="final-result">${finalResult}</div>
        <p>Click "New Game" to play again!</p>
      </div>
    `;

        // Disable choice buttons
        const choiceButtons = this.element.querySelectorAll('.choice-btn');
        choiceButtons.forEach(button => {
            button.disabled = true;
            button.classList.add('disabled');
        });
    }

    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}
