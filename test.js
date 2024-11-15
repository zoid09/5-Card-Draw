function assert(expectation, message) {
    if (!expectation) {
        console.error(message)
    } else {
        console.log('PASS ' + message)
    }
}


var hand01 = [cardBuilder(3, 'spades'),
    cardBuilder(12, 'spades'),
    cardBuilder(7, 'spades'),
    cardBuilder(10, 'spades'),
    cardBuilder(8, 'spades')]

assert(isAFlush(hand01), 'All spades hand is a flush')

var hand02 = [cardBuilder(3, 'hearts'),
    cardBuilder(12, 'spades'),
    cardBuilder(7, 'spades'),
    cardBuilder(10, 'spades'),
    cardBuilder(8, 'spades')]

assert(isAFlush(hand02), "All spades plus one heart is not a flush")

var hand3 = [cardBuilder(5, 'spades'),
   cardBuilder(6, 'diamonds'),
   cardBuilder(7, 'clubs'),
   cardBuilder(8, 'spades'),
   cardBuilder(9, 'hearts')]   
   
assert(isAStraight(hand3), "All Cards are incremental")

var hand4 =[cardBuilder(5, 'spades'),
    cardBuilder(7, 'diamonds'),
    cardBuilder(7, 'clubs'),
    cardBuilder(8, 'spades'),
    cardBuilder(9, 'hearts')] 

assert(isAStraight(hand4), "All Cards aren't incremental")

var hand5 = [cardBuilder(5, 'spades'),
    cardBuilder(7, 'diamonds'),
    cardBuilder(7, 'clubs'),
    cardBuilder(8, 'spades'),
    cardBuilder(9, 'hearts')] 

assert(isAPair(hand5), "2 card values match")

var hand6 = [cardBuilder(5, 'spades'),
    cardBuilder(7, 'diamonds'),
    cardBuilder(10, 'clubs'),
    cardBuilder(8, 'spades'),
    cardBuilder(9, 'hearts')] 

assert(isAPair(hand6), "2 card values don't match")

var hand7 = [cardBuilder(5, 'hearts'),
    cardBuilder(6, 'hearts'),
    cardBuilder(7, 'hearts'),
    cardBuilder(8, 'hearts'),
    cardBuilder(9, 'hearts')] 

assert(isAStraightFlush(hand7), "All suites match & are incremental")

var hand8 = [cardBuilder(5, 'spades'),
    cardBuilder(7, 'diamonds'),
    cardBuilder(7, 'clubs'),
    cardBuilder(8, 'spades'),
    cardBuilder(9, 'hearts')] 

assert(isAStraightFlush(hand8), "All card's suites don't match & aren't incremental")

var hand9 = [cardBuilder(5, 'spades'),
    cardBuilder(7, 'diamonds'),
    cardBuilder(7, 'clubs'),
    cardBuilder(8, 'spades'),
    cardBuilder(7, 'hearts')] 

assert(isThreeOfAKind(hand9), "Three card values match")

var hand10 = [cardBuilder(5, 'spades'),
    cardBuilder(7, 'diamonds'),
    cardBuilder(7, 'clubs'),
    cardBuilder(8, 'spades'),
    cardBuilder(10, 'hearts')] 

assert(isThreeOfAKind(hand10), "Three card values dont match")

var hand11 = [cardBuilder(7, 'spades'),
    cardBuilder(6, 'diamonds'),
    cardBuilder(7, 'clubs'),
    cardBuilder(7, 'spades'),
    cardBuilder(7, 'hearts')]
    
assert(isFourOfAKind(hand11), "Four card values match") 

var hand12 = [cardBuilder(5, 'spades'),
    cardBuilder(7, 'diamonds'),
    cardBuilder(7, 'clubs'),
    cardBuilder(8, 'spades'),
    cardBuilder(2, 'hearts')]
    
assert(isFourOfAKind(hand12), "Four card values dont match") 

var hand13 = [cardBuilder(10, 'hearts'),
    cardBuilder(11, 'hearts'),
    cardBuilder(12, 'hearts'),
    cardBuilder(13, 'hearts'),
    cardBuilder(14, 'hearts')]
    
assert(isARoyalFlush(hand13), "Is a royal flush")

var hand14 = [cardBuilder(5, 'hearts'),
    cardBuilder(7, 'hearts'),
    cardBuilder(7, 'hearts'),
    cardBuilder(8, 'hearts'),
    cardBuilder(3, 'hearts')]
    
assert(isARoyalFlush(hand14), "Not a royal flush") 

var hand15 = [cardBuilder(5, 'spades'),
    cardBuilder(6, 'diamonds'),
    cardBuilder(7, 'clubs'),
    cardBuilder(8, 'spades'),
    cardBuilder(9, 'hearts')]

assert(isARoyalFlush(hand15), "Not a royal flush") 

var hand16 = [cardBuilder(5, 'spades'),
    cardBuilder(7, 'diamonds'),
    cardBuilder(7, 'clubs'),
    cardBuilder(8, 'spades'),
    cardBuilder(4, 'hearts')]
    
assert(isARoyalFlush(hand16), "Not a royal flush") 

var hand17 = [cardBuilder(5, 'hearts'),
    cardBuilder(6, 'hearts'),
    cardBuilder(7, 'hearts'),
    cardBuilder(8, 'hearts'),
    cardBuilder(9, 'hearts')] 

assert(isARoyalFlush(hand17), "Not a royal flush")

var hand18 = [cardBuilder(5, 'spades'),
    cardBuilder(5, 'hearts'),
    cardBuilder(5, 'clubs'),
    cardBuilder(2, 'clubs'),
    cardBuilder(2, 'diamonds')]
    
assert(isAFullHouse(hand18), "Is a full house") 

var hand19 = [cardBuilder(5, 'hearts'),
    cardBuilder(6, 'hearts'),
    cardBuilder(7, 'hearts'),
    cardBuilder(8, 'hearts'),
    cardBuilder(10, 'hearts')] 

assert(isAFullHouse(hand19), "Not a full house")

var hand20 = [cardBuilder(7, 'hearts'),
    cardBuilder(7, 'hearts'),
    cardBuilder(7, 'hearts'),
    cardBuilder(8, 'hearts'),
    cardBuilder(10, 'hearts')] 

assert(isAFullHouse(hand20), "Not a full house")

var hand21 = [cardBuilder(14, 'spades'),
    cardBuilder(5, 'hearts'),
    cardBuilder(7, 'clubs'),
    cardBuilder(9, 'clubs'),
    cardBuilder(2, 'diamonds')]
    
assert(isAHighCard(hand21), "Is a high card")

var hand22 = [cardBuilder(4, 'spades'),
    cardBuilder(3, 'hearts'),
    cardBuilder(14, 'clubs'),
    cardBuilder(3, 'clubs'),
    cardBuilder(4, 'diamonds')]
    
assert(isTwoPairs(hand22), "Has 2 pairs")

var hand23 = [cardBuilder(14, 'spades'),
    cardBuilder(5, 'hearts'),
    cardBuilder(7, 'clubs'),
    cardBuilder(9, 'clubs'),
    cardBuilder(3, 'diamonds')]

assert(isTwoPairs(hand23), "Isn't 2 pairs")

var hand24 = [cardBuilder(14, 'spades'),
    cardBuilder(5, 'hearts'),
    cardBuilder(7, 'clubs'),
    cardBuilder(9, 'clubs'),
    cardBuilder(3, 'diamonds')]

var hand25 = [cardBuilder(14, 'hearts'),
    cardBuilder(5, 'hearts'),
    cardBuilder(7, 'clubs'),
    cardBuilder(10, 'clubs'),
    cardBuilder(3, 'diamonds')]

assert(handScore(hand24) < handScore(hand25), "Is < 24")










