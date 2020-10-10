const readlineSync = require("readline-sync");

// getInput() is a function that takes a `prompt` as an argument which
// is a question (string) to ask the user.
// the returning value of getInput() is a string of whatever the user has typed as the response

function getInput(prompt) {
  return readlineSync.question(`${prompt}: `);
}

const buildDeck = () => {
  const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'],
    ranks = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'],
    deck = [];


  ranks.forEach((rank, index) => {
    for (suit of suits) {
      deck.push({ suits: suit, rank: rank, value: index })
    }
  })
  return deck;
}

buildDeck();


const shuffle = deck => {
  let shuffledDeck = deck, currentIndex = deck.length - 1, temporaryValue, randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex),
      temporaryValue = shuffledDeck[currentIndex], // assign temporaryValue the entire length of the deck index
      shuffledDeck[currentIndex] = shuffledDeck[randomIndex], // last card in the deck gets assigned a random index
      shuffledDeck[randomIndex] = temporaryValue; // random index takes place of last card

    currentIndex--;
  }

  return shuffledDeck;
}

shuffle(buildDeck());


const greet = name => {
  name = getInput(`Hello and welcome to the game. What's your name?`);
  console.log(`Welcome ${name}, and have fun!\n`);
  return name;
}

const compare = (cardOne, cardTwo) => cardOne.value - cardTwo.value;


const guess = (cardOne, cardTwo) => {
  console.log(`>>> ${cardOne.rank} of ${(cardTwo.suits)} <<<`)
  let input = getInput(`\n- Do you think the next card will be higher or lower than current card? \n- For higher, enter 'H' - For lower, enter 'L'`).toLowerCase();

  switch (input) {
    case 'h':
      return compare(cardOne, cardTwo) < 0;
      break;
    case 'l':
      return compare(cardOne, cardTwo) > 0;
      break;
    default:
      console.log('\nATTENTION: Please guess either H or L next time! \nNo points earned this round.\n');
      return false;
  }

}


const playGame = () => {
  let deck = shuffle(buildDeck()),
    playerName = greet(),
    score = 0,
    currentCard = deck.pop();

  while (score < 5 && score < deck.length) {
    let nextCard = deck.pop();

    if (guess(currentCard, nextCard) == true) {
      score++;
      console.log(`\nCongratulations, that was correct! \nScore is now ${score}.\n`)
    } else {
      console.log(`\nIncorrect. No points earned.\nScore remains ${score}.\n`)
    }
    currentCard = nextCard;
  }


  deck.length <= 0 ? console.log(`Loss. You've reached the end!`) :
    console.log(`Congratulations ${playerName}, you won!`);
}


playGame();