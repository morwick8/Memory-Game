/* Michelle Orwick
 * This program is a classic card matching game. The object is to match all
 * 8 pairs in the least amount of moves and as quickly as possible.
 */

//Set global variables

var openCardContent = [];
var shuffledCards = [];
var matchNum = 0;
var moves = 0;
var seconds = 0;
var finalTime = 0;
var starCount = 3;
gameEnd = false;

//Set all EventListeners

var newDeck = document.getElementById('showingDeck');
newDeck.addEventListener('click', processClicks);
//var resetButton = document.getElementsByClassName('restart');
//resetButton.addEventListener('click', resetGame);

//Start the game

resetGame();


//This function resets all variables, and sets up the gameboard for a new game

function resetGame() {

// reset all global variables

  openCardContent = [];
  var shuffledCards = [];
  var matchNum = 0;
  var moves = 0;
  var seconds = 0;
  var finalTime = 0;
  var starCount = 3;
  gameEnd = false;

  //build deck with all class 'card' elements

  var listItem = document.getElementsByTagName('li');
  var currentCards = [];
  for (var i = 0; i < listItem.length; i++) {
    if (listItem[i].classList.contains('card')) {
      currentCards.push(listItem[i].innerHTML);
    };
  };

  //shuffle the deck

  shuffledCards = shuffle(currentCards);
  var lis = document.querySelectorAll('#showingDeck li');
  for(var i=0; li=lis[i]; i++) {
    li.parentNode.removeChild(li);
  };

  for (var i = 0; i < shuffledCards.length; i++) {
    var newCard = shuffledCards[i];
    var li = document.createElement("li");
    li.innerHTML = shuffledCards[i];
    li.className = 'card';
    document.getElementById("showingDeck").appendChild(li);
  };
};


/* This function defines what to do when the user clicks on game elements
*/

function processClicks(event) {
  //Track every click as a move
  recordMoves();

  /* Mark L on stackoverflow offered me a suggestion on how to handle the
  * clicked, listener, and event.target elements because I was stuck
  */
  var clicked = event.target;
  var listener = event.currentTarget;
  var List = event.target.classList;
  var faceValue = event.target.innerHTML;

  /*If the user clicks on a card, this checks whether the card is already
   * matched, whether it is face down, or whether it is "open", meaning face up
   *and unmatched.
   */

  if (clicked !== listener) {

      /*if the card was already matched it ignores it, if there's not an open card it
      * opens the card, and if there's an open card it looks for a match.
      */
      if (List.contains('match'))  {
            return false;
      } else if (!List.contains('open')) {
          List.add('open');
          List.add('show');
              if (openCardContent === undefined || openCardContent.length == 0) {
                openCardContent[0] = faceValue;
                return false;
              } else {
                var openCard = openCardContent[0];
                var match = checkMatch(faceValue, openCardContent[0]); //this returns true if it matches a card already face up
                if (match) {
                  checkNumberOfMatches();
                };
                if (!match) {
                  setTimeout(function() {unmatchedPair(faceValue,openCard)}, 1000);
                };
                openCardContent = [];
              };
          return false;
        } else { //if the card is already face up but clicked again, turn face down
          clicked.classList.toggle('open');
          clicked.classList.toggle('show');
          faceValue = '';
          openCardContent = [];
          return false;
        };
  } else {
    return false;
  }
  return false;
};

/*This checks for another open card,if there is another open card it checks for match.
 *If there's a match it returns true.
 */
function checkMatch(faceValue, openCard) {
  var cardList = document.getElementsByTagName('li');
    if (faceValue === openCard) { //if clicked card matches already open card
      for (var i = 0; i <cardList.length; i++) {
        var findCard = cardList.item(i);
//        console.log("There's already an open card, checking" + 'cardList.item(i) is ' + findCard);
        if (findCard.innerHTML === faceValue) {
          findCard.classList.add('match');
        };
      };
      return true;
    } else  {
      return false;
    };
};


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*This flips unmatched cards back face down, meaning it removes the open class
* from the unmatched selected pair after a 1 second delay.
*/
function unmatchedPair(faceValue,openCard) {
  var cardList = document.getElementsByTagName('li');
  for (var i = 0; i <cardList.length; i++) {
      if (cardList.item(i).innerHTML === faceValue) {
        cardList.item(i).classList.remove('open');
        cardList.item(i).classList.remove('show');
      };
      if (cardList.item(i).innerHTML === openCard) {
        cardList.item(i).classList.remove('open');
        cardList.item(i).classList.remove('show');
      };
    };
  };

//This track the number of moves, or clicks until all the cards are matched.
function recordMoves() {
  moves = moves+1;
  if (moves === 1) {
    startTimer();
  };
  var move = document.getElementsByClassName('moves');
  move[0].innerHTML = moves;
  starTracker(moves);
};

//This tracks the number of matches and triggers gameEnd when the last match is achieved.
function checkNumberOfMatches() {
  matchNum = matchNum +1;
  if (matchNum === 8) {
    gameEnd = true;
    finalTime = seconds;
    postModal();
  }
};

//This tracks and displays elapsed game time in seconds
function startTimer() {
  if (!gameEnd) {
    seconds++;
    document.getElementById('timer').innerHTML = seconds + " Seconds";
    setTimeout(startTimer, 1000);
  };
};

//Based on the number of moves, this tracks and displays a star rating of performance.
function starTracker(moves) {
  if (moves===36 || moves===48) {
    var lis = document.querySelectorAll('#starPanel li');
    lis[0].parentNode.removeChild(lis[0]);
    starCount--;
  };
};

//This displays a modal at the end of the game with a final scoreboard and a reset button
function postModal() {
  console.log("final time is " + finalTime);
  console.log("you scored " + starCount + "stars");

};
