import { RockPaperScissorsGame } from './gameLogic.js';
import { GameSetup } from './components/GameSetup.js';
import { GameBoard } from './components/GameBoard.js';

// Main App Class
export class App {
    constructor() {
        this.game = new RockPaperScissorsGame();
        this.currentComponent = null;
        this.appElement = document.getElementById('app');
    }

    // Initialize the application
    init() {
        this.showSetup();
    }

    // Show game setup screen
    showSetup() {
        this.destroyCurrentComponent();

        this.currentComponent = new GameSetup((rounds) => {
            this.startGame(rounds);
        });

        this.appElement.appendChild(this.currentComponent.render());
    }

    // Start a new game
    startGame(rounds) {
        this.game.initializeGame(rounds);
        this.showGameBoard();
    }

    // Show game board
    showGameBoard() {
        this.destroyCurrentComponent();

        this.currentComponent = new GameBoard(
            (choice) => this.handleUserChoice(choice),
            () => this.showSetup()
        );

        this.appElement.appendChild(this.currentComponent.render(this.game.getGameStats()));
    }

    // Handle user choice selection
    handleUserChoice(userChoice) {
        try {
            const roundData = this.game.playRound(userChoice);

            // Update the game board with new stats
            this.currentComponent.updateGameStats(this.game.getGameStats());

            // Show round result
            this.currentComponent.showRoundResult(roundData);

            // Check if game is finished
            if (this.game.gameState === 'finished') {
                setTimeout(() => {
                    const finalResult = this.game.getFinalResult();
                    this.currentComponent.showGameOver(finalResult);
                }, 1500); // Show final result after 1.5 seconds
            }
        } catch (error) {
            console.error('Error playing round:', error);
            alert('An error occurred while playing the round. Please try again.');
        }
    }

    // Destroy current component
    destroyCurrentComponent() {
        if (this.currentComponent && typeof this.currentComponent.destroy === 'function') {
            this.currentComponent.destroy();
        }
        this.currentComponent = null;
    }

    // Clean up the app
    destroy() {
        this.destroyCurrentComponent();
        this.game.reset();
    }
}
