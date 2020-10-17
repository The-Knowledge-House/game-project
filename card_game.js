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
  console.log(`Card: ${card1.rank} of ${(card2.suits)}`)
  let input = getInput(`\n- Do you think the next card will be higher or lower than this card? \n- For higher, enter 'H' - For lower, enter 'L'`).toLowerCase();

  switch (input) {
    case 'h':
      return compare(cardOne, cardTwo) < 0;
      break;
    case 'l':
      return compare(cardOne, cardTwo) > 0;
      break;
    default:
      console.log('\nATTENTION: Please guess either H or L next time! \nNo points earned this round.\n');
  }
}


const playGame = () => {
  let deck = shuffle(buildDeck()),
    playerName = greet(),
    score = 0,
    currentCard = deck.pop();

  while (score < 5 && score < deck.length) {
    let nextCard = deck.pop();

    if (guess(currentCard, nextCard) === true) {
      score++;
      console.log(`\nCongratulations, that was correct! \nScore is now ${score}.\n`)
    } else {
      console.log(`\nIncorrect. No points earned.\nScore remains ${score}.\n`)
    }
    currentCard = nextCard;
  }
}


// STEP FIVE - Respond to User Guess
// 1. declare a function called guess that takes two cards as arguments
// 2. console.log the rank and suit of the current card
// 3. declare a variable called "input" that uses getInput() to ask the user if they think the next card will be higher (h) or lower (l) than their current card and stores the user's response.
// 4. use a conditional statement to see if "input" equals "h" or "l".
// 5. If input equals h, return an expression that checks if the outcome of the compare function (using the same arguments as you used for guess) is a negative number.
// 6. If input equals l, check and see if it's a positive number.
// 7. If input doesn't equal h or l, tell the user that they need to guess either h or l and that they get no points for this round, then return false.

// STEP SIX - Let's play!
// 1. declare a function called playGame
// 2. declare a variable called deck (it's okay to reuse -- remember scope!) that takes the result of the shuffle function. Remember that the shuffle function needs to take the results one of our other functions as its argument...
// 3. declare a variable called playerName that takes the result of the greet function as its value.
// 4. using let, declare a score variable that's currently set to the number zero
// 5. use an array method on deck to remove the last object in deck. using let, declare a variable called currentCard and assign it this value.
// 6. create a while loop whos conditions are that score is less than five AND less than the amount of items still in the deck array.
// 7. Inside the while loop, use an array method on deck to remove the last object and assign that value to a variable named nextCard.
// 8. Inside the while loop, create a conditional statement. If the outcome of guess is true, increment the score by 1, congratulate the user, and tell them their score. If it's false, tell them they were wrong and got no points.
// 9. Close the conditional statement and assign nextCard to currentCard. You may have to write this as the type of variable that's always global...
// 10. Close the while loop and use a ternary statement that checks if the length of the deck array has reached zero. If it has not, tell the user that they won. If it has reached zero, tell them that they're out of cards and they lost.
// 11. Write a line of code to execute the playGame function.
