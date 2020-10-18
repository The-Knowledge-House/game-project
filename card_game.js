const readlineSync = require("readline-sync");

// getInput() is a function that takes a `prompt` as an argument which
// is a question (string) to ask the user.
// the returning value of getInput() is a string of whatever the user has typed as the response

function getInput(prompt) {
  return readlineSync.question(`${prompt}: `);
}

// YOUR CODE STARTS HERE!!

// STEP ONE - Building A Deck.

//buildDeck.push and position array
// 1. use a function declaration to create a buildDeck function.
// 2. inside the buildDeck function, create an array called "suits" that lists all four suits from a deck of card as strings.
// 3. inside the buildDeck function, create a 2nd array called "ranks" that lists all 13 cards from ace to King as strings.
// 4. inside the buildDeck function, create an empty array called "deck"
// 5. inside the buildDeck function, create a for loop INSIDE of another for loop. The outer loop should loop through the ranks. The inner loop should loop through the suits. Make sure to use different variables for your iterators.
// 6. inside your inner for loop, push your looped iterations of ranks and suits as OBJECTS into the empty deck array. Add a third property to this object with the key "value" and the value equal to the current iterator.
// HINT: The result of step 6 is that each card will be an object inside of the deck array, for example [{suit: "diamonds", rank: "A", value: 0}, {suit: "diamonds", rank: "2", value: 1},...{etc}]. For example, if we wanted to organize the players and teams of the NBA with index numbers, we could write: nba.push({player: players[i], team: teams[n], index: i})
// 7. After your loops, return deck, which should now return an array full of card objects if you were to run buildDeck().

function buildDeck() {
  let suits = ["spades", "hearts", "clubs", "diamonds"];
  let ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
  let deck = [];

  for (let i = 0; i < ranks.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      deck.push({ suits: suits[j], ranks: ranks[i], value: i });
    }
  }
  return deck;
}

buildDeck();

function shuffle(deck) {
  let shuffledDeck = deck
  let currentIndex = deck.length -1;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * (currentIndex)); // randomizing the index of all the cards in the deck (ie uo to the nuber 52 (number of cards in the deck));
    temporaryValue = shuffledDeck[currentIndex]; // card value of the card chosen, due to the randomized index that was given in the randomIndex variable above.
    shuffledDeck[currentIndex] = shuffledDeck[randomIndex]; //takes the card index selected from randomized card deck shuffling, and assigns it as the current card that you have. 
    shuffledDeck[randomIndex] = temporaryValue; //gives your chosen card the value of your randonmly selected card, after shuffling. 

    currentIndex --; //dashes mean subtract from currentIndex one index value
  }

  return shuffledDeck;
}
  
// console.log(shuffle(buildDeck()));
  
function greet() {
  let name = getInput("Welcome to the game! What is your name?");
  console.log(name);
  return name;

}

function compare(card1, card2) {
  return card1.value - card2.value;

} 

function guess(card1, card2) {
  console.log(`Current card: ${card1.rank} of ${(card2.suits)}`)
  let input = getInput(`Do you think the next card will be higher or lower than the current card that you have? If higher, answer: H. For lower, answer L.`).toLowerCase();
  //used .toLowerCase to account for any case sensitive discrepencies in user input answer.

  switch (input) {
    case 'h':
      return compare(card1, card2) < 0; 
      //checks if result of comparison is negative
      break;
    case 'l':
      return compare(card1, card2) > 0;
      //checks if result of comparison is positive
      break;
    default:
      console.log('You need to guess either higher (H) or lower (L). For now, you get no points for this round. Please answer higher or lower for the next round.');
  }
}

function playGame() {
  let deck = shuffle(buildDeck()),
    playerName = greet(),
    score = 0,
    currentCard = deck.pop();

  //while loop that states score is less than 5, and less than the amount of items still in the deck
  while (score < 5 && score < deck.length) {
    let nextCard = deck.pop(); //removes the last object and assigns this value to the variable nextCard

    if (guess(currentCard, nextCard) === true) {
      score++; //when the guess is correct (true), the player's score increases by 1
      console.log(`Congratulations, your score is now ${score}!`)
    } else {
      console.log(`Sorry, your answer was wrong and you did not gain any points in this round. Your score stayed the same at ${score}.`)
    }
    currentCard = nextCard;
  }

  // ternary statement for checking if the legth of the deck array has reached zero
  deck.length <= 0 ?
    console.log(`Sorry ${playerName}, you've ran out of cards and lost the game.`) :
    console.log(`Congratulations ${playerName}, you've won the game!`);
}
  
playGame();

