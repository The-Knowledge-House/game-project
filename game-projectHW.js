const readlineSync = require("readline-sync");
function getInput(prompt) {
  return readlineSync.question(`${prompt}: `);
}

function buildDeck() {
    let suits = ["hearts", "clubs", "spades", "diamonds"];
    let ranks =  ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "King", "Queen", "Jacks"];
    let deck = [];
    
    for (let i = 0; i < ranks.length; i++) {
        for (let c = 0; c < suits.length; c++) {
          let card = {ranks:ranks[i], suits:suits[c], value:i};
              deck.push(card);
        } 
    }
    return(deck);
}
console.log(buildDeck());

function shuffle(deck) {
    let shuffleDeck = deck;

    let currentIndex = deck.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      
      temporaryValue = shuffleDeck[currentIndex];
      shuffleDeck[currentIndex] = shuffleDeck[randomIndex]
      shuffleDeck[randomIndex] = temporaryValue

      currentIndex--
    } 
    return shuffleDeck;
  }
  console.log(shuffle(buildDeck()));

  /* 10. Review the code from steps 7,8, and 9, and leave a comment explaining what you believe those lines of code are doing as they swap assignments of values between them.*/

  /*  The game is shuffling the deck.
      The different decks that come out is the "ramdonIndex".
      temporaryValue "now" will be displayed as shuffleDeck[currentIndex]; then we changed ShuffleDeck[currentIndex] to shuffleDeck[randomIndex] and then shuffleDeck[randomIndex] will be made into temporaryValue.  I think it is programmed this way so that it can go thru certain steps throughout the process. */  


       function greet() {
        let name = "";
        name = getInput("Welcome to the game! What is your name?");
        console.log(name);
        return name;
      }    
     

  function compare(card1, card2) {
  return card1.value - card2.value;
}
console.log(compare({value:5}, {value:3}));

  
 function guess(card1, card2) {
   console.log("current card rank: " + card1.ranks);
   console.log("current card suit: " + card1.suits);

   let input = getInput("Do you think the next card will be higher (h) or lower (l?");
   if (input == 'h') {
     return compare(card1, card2) < 0;
    }else if (input == 'l') { 
      return compare(card1, card2) > 0;
    }else{
      console.log("You need to guess 'h' or 'l' and you get no points for this round");
      return false;
        }
      }


function playGame() {
  let deck = shuffle(buildDeck());
  let playerName = greet();
  let score = 0;
  let currentCard = deck.pop();
  while (score < 5 &&  score < deck.length) {
    let nextCard = deck.pop();
    if (guess(currentCard, nextCard) == true) {
      score++;
      console.log("You are right!!" + `${score}`);
    }else{
      console.log("You're Wrong, No Points!");
      }
      currentCard = nextCard;
    }

    if (deck.length == 0) {
      console.log("You have lost!");
    }else{
      console.log("You have won!");
      }
    }
playGame();





