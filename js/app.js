/*Michelle Orwick
 * Create a list that holds all of your cards
 */
//var card = document.getElementsByClassName("card");
//var currentCards = [...card];
var listItem = document.getElementsByTagName('li');
var currentCards = [];
for (var i = 0; i < listItem.length; i++) {
    if (listItem[i].className === 'card' || listItem[i].className === 'card match' || listItem[i].className === 'card open show'){
      currentCards.push(listItem[i].innerHTML);
    };
};
console.log(currentCards);
//console.log(currentCards[0]);
var shuffledCards = shuffle(currentCards);
console.log(shuffledCards[0]);
console.log(shuffledCards.length);
var lis = document.querySelectorAll('#showingDeck li');
for(var i=0; li=lis[i]; i++) {
    li.parentNode.removeChild(li);
}
//var deck = document.querySelector(".deck");
//childNodes = deck.innerHTML;
//deck.remove(childNodes);
for (var i = 0; i < shuffledCards.length; i++) {
    var newCard = shuffledCards[i];
    console.log(newCard);
    var ul = document.getElementById("showingDeck");
    var li = document.createElement("li");
    li.innerHTML = shuffledCards[i];
    li.className = "card";
    document.getElementById("showingDeck").appendChild(li);

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
