var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});


/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function() {
  var unplacedCards = [];

  for (var i = 1; i <= 8; i++) {
    unplacedCards.push(i,i);
  };

  var cardValues = [];

  while (unplacedCards.length > 0) {
    var randomIndex = Math.floor(Math.random()*unplacedCards.length);
    cardValues.push(unplacedCards[randomIndex]);
    unplacedCards.splice(randomIndex, 1);
  };

  return cardValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var colors = [
    'hsl(25,85%,65%)',
    'hsl(55,85%,65%)',
    'hsl(90,85%,65%)',
    'hsl(160,85%,65%)',
    'hsl(220,85%,65%)',
    'hsl(265,85%,65%)',
    'hsl(310,85%,65%)',
    'hsl(360,85%,65%)'];

  $game.empty();
  $game.data('flippedCards', []);

  for (var t= 0; t < cardValues.length; t++) {
    var value = cardValues[t];
    var color = colors[value - 1];
    var data = {
      color: color,
      value: value,
      isFlipped: false,
    };

    var $cardElement = $('<section class="col-xs-3 card"></section>');
    $cardElement.data(data)

    $game.append($cardElement);
  }
  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('isFlipped')) {
    return;
  }

  $card.css('background-color', $card.data('color'))
      .text($card.data('value'))
      .data('isFlipped', true);

  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);

  if (flippedCards.length === 2) {
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      var matchCss = {
        backgroundColor: 'rgb(153, 153, 153)',
        color: 'rgb(204, 204, 204)'
      };
      flippedCards[0].css(matchCss);
      flippedCards[1].css(matchCss);
    } else {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      window.setTimeout(function() {
        card1.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('isFlipped', false);
        card2.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('isFlipped', false);
      }, 350);
    }
      $game.data('flippedCards', []);
  }
};
