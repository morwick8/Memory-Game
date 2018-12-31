/*Michelle Orwick
 * Create a list that holds all of your cards
 */

var openCardContent = [];
resetGame();
var newDeck = document.getElementById('showingDeck');
newDeck.addEventListener('click', processClicks);
var shuffledCards = [];
var matchNum = 0;


function resetGame() {
  resetTimer();
  resetStars();
  resetMoveCounter();

  var listItem = document.getElementsByTagName('li');
  var currentCards = [];
  for (var i = 0; i < listItem.length; i++) {
    if (listItem[i].classList.contains('card')) {
      currentCards.push(listItem[i].innerHTML);
    };
  };
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
//    console.log(li);
  };
};

//this function was suggested by Mark L on stackoverflow
function processClicks(event) {
  var clicked = event.target;
  var listener = event.currentTarget;
  var List = event.target.classList;
  var faceValue = event.target.innerHTML;
  if (clicked !== listener) {
    console.log('clicked');
  //this goes through elements to find which one matches click
      if (List.contains('match'))  { //if the card was already matched it ignores it and returns false
          console.log(List);
          return false;
      } else if (!List.contains('open')) { //if the card is face down
          console.log(List);
          console.log('card is face down');
          List.add('open'); //turn the card face up
          List.add('show');
          console.log(List);
          console.log('turning card face up ');
              if (openCardContent === undefined || openCardContent.length == 0) { //and there is not another open card
                console.log("there is not another open card");
                openCardContent[0] = faceValue; //make this the open card
                return false;
              } else { //if there's already another open card, check this one to see if it matches open card
                console.log("openCardContent does not equal empty array, check for match");
                var match = checkMatch(faceValue); //this returns true if it matches a card already face up
                if (match) {
                  checkNumberOfMatches();
                };
                if (!match) {
                  console.log("going to unmatchedPair");
                  setTimeout(unmatchedPair(faceValue,openCardContent[0]), 10000);
                };
                openCardContent = [];
              };
          return false;
        } else { //if the card is already face up but clicked again, turn face down
          console.log("turning card back face down");
          clicked.classList.toggle('open');
          clicked.classList.toggle('show');
          return false;
        };
  } else {
    return false;
  }
  return false;
};

//this checks for another open card,if there is another open card it checks for match.  If there's a match it returns true, and resets openCard to "".
function checkMatch(faceValue) {
  var cardList = document.getElementsByTagName('li');
  console.log('checking for match');
    if (faceValue === openCardContent[0]) { //if clicked card matches already open card
      for (var i = 0; i <cardList.length; i++) {
        var findCard = cardList.item(i);
        console.log("There's already an open card, checking" + 'cardList.item(i) is ' + findCard);
        if (findCard.innerHTML === faceValue) {
          console.log('match found');
          findCard.classList.add('match');
        };
      };
      return true;
    } else  {
      return false;
    };
};
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//const faceUp = 'card open show';
//for (var i = 0; i < currentCards.length; i++){
//  currentCards[i].className = faceUp;
//}
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



function resetTimer() {
  console.log('resetting timer');
};
function resetStars() {
  console.log('resetting stars');
};

function resetMoveCounter() {
  console.log('resetting moves');
};

function showBeforeTurn(findCard) {
//  findCard.classList.remove("open");
//  findCard.classList.remove("show");
  console.log("classList after time delay " + findCard.classList);
};

function unmatchedPair(card1,card2) {
  var cardList = document.getElementsByTagName('li');
  console.log("faceValue = " +card1);
  console.log("openCardContent " +card2);
  for (var i = 0; i <cardList.length; i++) {
      console.log(cardList.item(i).classList + "before");
      if (cardList.item(i).innerHTML === card1) {
        cardList.item(i).classList.remove('open');
        cardList.item(i).classList.remove('show');
        console.log(cardList.item(i).innerHTML + cardList.item(i).classList + "after");
      };
      if (cardList.item(i).innerHTML === card2) {
        cardList.item(i).classList.remove('open');
        cardList.item(i).classList.remove('show');
        console.log(cardList.item(i).innerHTML + cardList.item(i).classList + "after");

      };
    };
  };

function checkNumberOfMatches() {
  matchNum = matchNum +1;
  if (matchNum === 8) {
    stopTimer();
    postStars();
    postModal();
  }
};

function stopTimer() {
  console.log("timer stopped");
}

function postStars() {
  console.log("post stars");
};

function postModal() {
  console.log("show postModal");
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
