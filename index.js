let deck = [];
let graveyard = [];
let suite = ["hearts", "clubs", "diamonds", "spades"];
let hand1 = [];
let hand2 = [];
let intervalCounter = 0

function cardBuilder(cardValue, suite, imgURL) {
  if (cardValue === 11) {
    return {cardValue, suite, imgURL: `./img/Jack${suite}.png`};
  } 
  if (cardValue === 12) {
    return {cardValue, suite, imgURL: `./img/Queen${suite}.png`};
  }
  if (cardValue === 13) {
    return {cardValue, suite, imgURL: `./img/King${suite}.png`};
  }
  if (cardValue === 14) {
    return {cardValue, suite, imgURL: `./img/Ace${suite}.png`};
  } else {
    return {cardValue, suite, imgURL: `./img/${cardValue}${suite}.png`};
  }
}

function buildDeck() {
  for (let i = 2; i < 15; i++) {
    for (let j = 0; j < suite.length; j++) {
      let card = cardBuilder(i, suite[j]);
      deck.push(card);
    }
  } 
}

function shuffleDeck(){
    for(let i = 0; i < deck.length; i++){
        let randomNumber = Math.floor(Math.random() * deck.length)
        let randomCard = deck[randomNumber]
        let card = deck[i]
        deck[i] = randomCard
        deck[randomNumber] = card
    }
}

function cutDeck(){
    let pivot = Math.floor(Math.random() * deck.length)
    let bottomHalf= []
    let topHalf = []
    for(let i = 0; i < pivot; i++){
        bottomHalf.push(deck[i])
    }
    for(let i = pivot; i < deck.length; i++){
        topHalf.push(deck[i])
    }
    deck = topHalf.concat(bottomHalf)
}

function drawACard(hand){
  let topCard= deck.pop()
  hand.push(topCard)
}

function drawStartingHand(){
  for(let i = 0; i < 5; i++){
    drawACard(hand1); 
    drawACard(hand2); 
  }
}

function replaceCards(hand1){ 
  if (graveyard.length > 0){
      for(let i = 0; i < graveyard.length; i++)
      drawACard(hand1)
  }
  if (hand1.length === 0){
    drawACard(hand1)
    drawACard(hand1)
    drawACard(hand1)
    drawACard(hand1)
    drawACard(hand1)
  }
  console.log("replacing cards")
}

function displayHand1(hand1) {
  $('.player1').empty();
  $('.player1').off('click', '.shadow');
  for (let card of hand1){
    let $img = $('<img>')
      .attr('src', card.imgURL)
      .addClass('card')
      .on('mouseenter mouseleave', function(event) {
        $(this).toggleClass('highlight', event.type === 'mouseenter');
      })
    $('.player1').append($img);
  }
}

function displayHand2(hand2){
  $('.player2').empty();
  for(let i = 0; i < hand2.length; i++){
    let $img = $('<img>').attr('src', './img/cardBack.png');
    $('.player2').append($img)
  }
}

function displayHand2ver2(hand2){
  $('.player2').empty();
  for (let card of hand2){
    let $img = $('<img>')
      .attr('src', card.imgURL)
      .addClass('card')
      $('.player2').append($img)
}
}

function handScore(hand){
  let handScore = 0
  if (isARoyalFlush(hand)){
    handScore = 10000 
  } else if(isAStraightFlush(hand)){
    let kicker = evaluateHand(hand)
    handScore = 9000 + (kicker * 10)
  } else if (isFourOfAKind(hand)){
    let kicker = evaluateHand(hand)
    handScore = 8000 + (kicker * 10)
  } else if(isAFullHouse(hand)){
    let kicker = evaluateHand(hand)
    handScore = 7000 + (kicker * 10)
  } else if (isAFlush(hand)){
    let kicker = evaluateHand(hand)
    handScore = 6000 + (kicker * 10)
  } else if(isAStraight(hand)){
    let kicker = evaluateHand(hand) 
    handScore = 5000 + (kicker * 10) 
  } else if(isThreeOfAKind(hand)){
    let kicker = evaluateHand(hand)
    handScore = 4000 + (kicker * 10)
  } else if(isTwoPairs(hand)){
    let kicker = evaluateHand(hand)
    handScore = 3000 + (kicker * 10)
  } else if(isAPair(hand)){
    let kicker = evaluateHand(hand)
    handScore = 2000 + (kicker * 10)
  } else if(isAHighCard(hand)){
    let kicker = evaluateHand(hand)
    handScore = 1000 + (kicker * 10)
  }
  return handScore
}

function evaluateHand(hand){
  let valueCount = [];
  for (let i = 0; i < 15; i++) {
    valueCount[i] = 0;
  }
  for (let i = 0; i < hand.length; i++) {
    let value = hand[i].cardValue;
    valueCount[value]++;
  } if(isAStraightFlush(hand) === true){
    return hand[0].cardValue + hand[1].cardValue + hand[2].cardValue + hand[3].cardValue + hand[4].cardValue
  } else if (isFourOfAKind(hand) === true){
    let fourOfAKind = getCardValueCount(4)
    return 4 * fourOfAKind
  } else if (isAFullHouse(hand) === true){
    let threeOfAKind = getCardValueCount(3)
    let pair = getCardValueCount(2)
    return (3 * threeOfAKind) + (2 * pair)
  } else if(isAFlush(hand) === true){
    return isAHighCard(hand) + isSecondHighestCard(hand) + isThirdHighestCard(hand)
  } else if(isAStraight(hand) === true){
    return hand[0].cardValue + hand[1].cardValue + hand[2].cardValue + hand[3].cardValue + hand[4].cardValue
  } else if(isThreeOfAKind(hand) === true){
    let threeOfAKind = getCardValueCount(3)
    return 3  * threeOfAKind
  } else if(isTwoPairs(hand) === true){
    let twoPairs = getCardValueCount(2)
    return twoPairs + isAHighCard(hand) 
  } else if(isAPair(hand) === true){
    let pair = getCardValueCount(2)
    return 2 * pair + isAHighCard(hand) + isSecondHighestCard(hand) + isThirdHighestCard(hand)
  } else {
    return isAHighCard(hand) + isSecondHighestCard(hand) + isThirdHighestCard(hand)
  }

  function getCardValueCount(count) {
    if(isTwoPairs(hand) === true) {
      calculateTwoPairs(count, valueCount)
    } else {
      for(let i = 2; i < valueCount.length; i++) {
        if(valueCount[i] === count) {
              return i;
          } 
      }
    }
  }
  
  function calculateTwoPairs(count, valueCount){
    let pair = []
    for(let i = 2; i < valueCount.length; i++) {
      if(valueCount[i] === count) {
          pair.push(i)
        } 
    }
      return 2 * pair[0] + 2 * pair[1]
  }
}

function isARoyalFlush(hand){
  if(isAFlush(hand) && isAStraight(hand) && isAHighCard(hand) === 14) {
    return true
  } else {
    return false
  }
}

function isAStraightFlush(hand){   
  if(isAFlush(hand) === true && isAStraight(hand) === true){
    return true
  }
  return false
}

function isFourOfAKind(hand){
  for(let i = 0; i < hand.length; i++){
    for(let j = i + 1; j < hand.length; j++){
      for(let k = j + 1; k < hand.length; k++){
        for(let l = k + 1; l < hand.length; l++){
          if (hand[i].cardValue === hand[j].cardValue 
             && hand[j].cardValue === hand[k].cardValue 
             && hand[k].cardValue === hand[l].cardValue){
            return true;
          }
        } 
      }
    }
  }
  return false;
}

function isAFullHouse(hand) {
  let valueCount = [];
  for (let i = 0; i < 15; i++) {
    valueCount[i] = 0;
  }
  for (let i = 0; i < hand.length; i++) {
    let value = hand[i].cardValue;
    valueCount[value]++;
  }

  let hasThreeOfAKind = false;
  let hasPair = false;

  for (let i = 2; i < 15; i++) { 
    if (valueCount[i] === 3) {
      hasThreeOfAKind = true
    } else if (valueCount[i] === 2) {
      hasPair = true;
    }
  }
  if(hasThreeOfAKind && hasPair) {
    return true;
  }
  return false;
}

function isTwoPairs(hand) {
  let valueCount = [];
  let hasTwoPairs = [];
  for (let i = 2; i < 15; i++) {
    valueCount[i] = 0;
  }
  for (let i = 0; i < hand.length; i++) {
    let value = hand[i].cardValue;
    valueCount[value]++;
  }
  for(let i = 0; i < valueCount.length; i++){
    if(valueCount[i] === 2){
      hasTwoPairs.push(i)
    } 
  }
  if(hasTwoPairs.length === 2){
    return true
  } else{
    return false
  }
}

function isAFlush(hand){
  let firstCard = hand[0]
  for(let i = 0; i < hand.length; i++){
    let nextCard = hand[i]
    if(nextCard.suite !== firstCard.suite){
      return false
    }
  }
  return true
}

function isAStraight(hand) {
  const sortedHand = hand.toSorted((card1, card2) => card1.cardValue - card2.cardValue);
  for (let i = 1; i < sortedHand.length; i++) {
    if (sortedHand[i].cardValue !== sortedHand[i - 1].cardValue + 1) {
      return false; 
    }
  }
  return true;
}

function isThreeOfAKind(hand){
  for (let i = 0; i < hand.length; i++){
    for (let j = i + 1; j < hand.length; j++){
      for (let k = j + 1; k < hand.length; k++){
        if (hand[i].cardValue === hand[j].cardValue && hand[j].cardValue === hand[k].cardValue){
          return true;
        }
      }
    }
  }
  return false;
}

function isAPair(hand){
  for (let i = 0; i < hand.length; i++){
   for(let j = i + 1; j < hand.length; j++){
      if(hand[i].cardValue === hand[j].cardValue){
        return true
      }
    }
  } 
  return false
}

function isAHighCard(hand){
  let highestCard = hand[0]
  for(let i = 0; i < hand.length; i++){
    if (hand[i].cardValue > highestCard.cardValue){
      highestCard = hand[i];
    } 
  }
  return highestCard.cardValue
}

function isSecondHighestCard(hand) {
  let sortedHand = hand.toSorted((a, b) => a.cardValue - b.cardValue);
  return sortedHand[sortedHand.length - 2].cardValue;
}

function isThirdHighestCard(hand) {
  let sortedHand = hand.toSorted((a, b) => a.cardValue - b.cardValue);
  return sortedHand[sortedHand.length - 3].cardValue;
}

function declareWinner(score1, score2){
  if(score1 > score2){
    $('#winnerDisplay').empty().append("<h2>Player 1 Wins!(Press R to Reset)</h2>") 
  } else if(score2 > score1){
    $('#winnerDisplay').empty().append("<h2>Player 2 Wins!(Press R to Reset)</h2>")
  } else if(score1 === score2){
    $('#winnerDisplay').empty().append("<h2>Tie Game!(Press R to Reset)</h2>")
  }
}

function resetGame() {
  deck = deck.concat(graveyard, hand1, hand2);
  graveyard = [];
  hand1 = [];
  hand2 = [];
  score1 = 0;
  score2 = 0;
  intervalCounter = 0;
  shuffleDeck();
  cutDeck();
  $('.player1').empty().append($('<img>').attr('src', './img/cardBack.png'));
  $('.player2').empty().append($('<img>').attr('src', './img/cardBack.png'));
  $('#winnerDisplay').empty().append("<h2>Draw A Hand!(Press D)</h2>");
}

buildDeck();
shuffleDeck()
cutDeck()

setInterval(function(){
  let intervalCounterIs10 = intervalCounter === 10
  let handLength = hand1.length < 5
  let hand2Length = hand2.length > 0
  /*let notCardBack = hand1[0] && hand1[0].imgURL !== "img/cardBack.png"*/
  console.log(intervalCounterIs10, handLength)
  intervalCounter++;
  console.log(intervalCounter)
  /*console.log(shouldReplaceHand)*/
  console.log(hand1)
  if(intervalCounterIs10 && handLength && hand2Length){
    console.log("interval working")
    replaceCards(hand1)
    displayHand1(hand1)
    displayHand2ver2(hand2)
     score1 = handScore(hand1)
     score2 = handScore(hand2)
    declareWinner(score1, score2)
  } 
}, 1000)

$(document).on("keydown", function(event){
  if(event.key === "d"){
    $('#winnerDisplay').empty().append("<h2>Discard Some Card(s)</h2>") 
    drawStartingHand()
    displayHand1(hand1)
    displayHand2(hand2)
  }
})

$("#cardDisplay1").on("click", "img", function() {
    $(this).toggleClass('selected');
    if ($(this).hasClass('selected')) {
      let imgSrc = $(this).attr('src'); 
      let index = hand1.findIndex(card => card.imgURL === imgSrc);
      if (index !== -1) {
        graveyard.push(hand1.splice(index, 1)[0]);
        $(this).remove();
        intervalCounter = 0 
      }
    }
  }); 

  $(document).on("keydown", function(event){
    if(event.key === "r"){
      resetGame()
    }
  })