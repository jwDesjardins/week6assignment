class Card {
  constructor(rank, suit, value) {
    this.rank = rank;
    this.suit = suit;
    this.value = value;
  }
}

class Deck {
  constructor() {
    this.cards = [];
  }

  generateDeck() {
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

    for (const suit of suits) {
      for (let i = 0; i < ranks.length; i++) {
        const value = i + 2;
        const card = new Card(ranks[i], suit, value);
        this.cards.push(card);
      }
    }
  }

  shuffle() {
    let currentIndex = this.cards.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }
  }

  dealCard() {
    return this.cards.pop();
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.hand = [];
  }

  playCard() {
    return this.hand.pop();
  }

  addScore(points) {
    this.score += points;
  }

  reset() {
    this.score = 0;
    this.hand = [];
  }
}

class Game {
  constructor() {
    this.player1 = new Player("Player 1");
    this.player2 = new Player("Player 2");
    this.deck = new Deck();
  }

  start() {
    this.deck.generateDeck();
    this.deck.shuffle();

    for (let i = 0; i < 26; i++) {
      this.player1.hand.push(this.deck.dealCard());
      this.player2.hand.push(this.deck.dealCard());
    }
  }

  playRound() {
    const card1 = this.player1.playCard();
    const card2 = this.player2.playCard();

    if (card1.value > card2.value) {
      this.player1.addScore(1);
    } else if (card1.value < card2.value) {
      this.player2.addScore(1);
    }
  }

  determineWinner() {
    if (this.player1.score > this.player2.score) {
      return this.player1.name;
    } else if (this.player1.score < this.player2.score) {
      return this.player2.name;
    } else {
      return "It's a tie!";
    }
  }

  play() {
    this.start();

    while (this.player1.hand.length > 0 || this.player2.hand.length > 0) {
      this.playRound();
    }

    const winner = this.determineWinner();
    console.log(`Final score: ${this.player1.name}: ${this.player1.score}, ${this.player2.name}: ${this.player2.score}`);
    console.log(`Winner: ${winner}`);
  }
}
describe('Game', () => {
  describe('playRound', () => {
    it('should award a point to the player with the higher card value', () => {
      const game = new Game();
      game.player1.hand = [new Card('A', 'Hearts', 14)];
      game.player2.hand = [new Card('K', 'Spades', 13)];
      game.playRound();
      expect(game.player1.score).to.equal(1);
      expect(game.player2.score).to.equal(0);
    });
  });
});

const game = new Game();
game.play();

