// Game constants
export const CHOICES = {
    ROCK: 'rock',
    PAPER: 'paper',
    SCISSORS: 'scissors'
};

export const RESULT = {
    WIN: 'win',
    LOSE: 'lose',
    TIE: 'tie'
};

// Game logic class
export class RockPaperScissorsGame {
    constructor() {
        this.totalRounds = 0;
        this.currentRound = 0;
        this.userScore = 0;
        this.aiScore = 0;
        this.roundHistory = [];
        this.gameState = 'setup'; // 'setup', 'playing', 'finished'
    }

    // Initialize game with number of rounds
    initializeGame(rounds) {
        this.totalRounds = parseInt(rounds);
        this.currentRound = 0;
        this.userScore = 0;
        this.aiScore = 0;
        this.roundHistory = [];
        this.gameState = 'playing';
    }

    // Get AI's random choice
    getAIChoice() {
        const choices = Object.values(CHOICES);
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    // Determine round result
    determineResult(userChoice, aiChoice) {
        if (userChoice === aiChoice) {
            return RESULT.TIE;
        }

        const winConditions = {
            [CHOICES.ROCK]: CHOICES.SCISSORS,
            [CHOICES.PAPER]: CHOICES.ROCK,
            [CHOICES.SCISSORS]: CHOICES.PAPER
        };

        return winConditions[userChoice] === aiChoice ? RESULT.WIN : RESULT.LOSE;
    }

    // Play a single round
    playRound(userChoice) {
        if (this.gameState !== 'playing') {
            throw new Error('Game is not in playing state');
        }

        const aiChoice = this.getAIChoice();
        const result = this.determineResult(userChoice, aiChoice);

        // Update scores
        if (result === RESULT.WIN) {
            this.userScore++;
        } else if (result === RESULT.LOSE) {
            this.aiScore++;
        }

        // Record round history
        const roundData = {
            round: this.currentRound + 1,
            userChoice,
            aiChoice,
            result,
            userScore: this.userScore,
            aiScore: this.aiScore
        };

        this.roundHistory.push(roundData);
        this.currentRound++;

        // Check if game is finished
        if (this.currentRound >= this.totalRounds) {
            this.gameState = 'finished';
        }

        return roundData;
    }

    // Get game statistics
    getGameStats() {
        return {
            totalRounds: this.totalRounds,
            currentRound: this.currentRound,
            userScore: this.userScore,
            aiScore: this.aiScore,
            gameState: this.gameState,
            roundHistory: [...this.roundHistory]
        };
    }

    // Get final game result
    getFinalResult() {
        if (this.gameState !== 'finished') {
            return null;
        }

        if (this.userScore > this.aiScore) {
            return 'You won the game! 🎉';
        } else if (this.aiScore > this.userScore) {
            return 'AI won the game! 🤖';
        } else {
            return 'It\'s a tie! 🤝';
        }
    }

    // Reset game
    reset() {
        this.totalRounds = 0;
        this.currentRound = 0;
        this.userScore = 0;
        this.aiScore = 0;
        this.roundHistory = [];
        this.gameState = 'setup';
    }
}
