$(document).ready(function() {

	$("#power-button").on('click', function(){
		var styleButton = $(this).children('.style-button');
		if(styleButton.hasClass('turn-on')) {
			styleButton.removeClass('turn-on');
			styleButton.addClass('turn-off');
		} else if(styleButton.hasClass('turn-off')) {
			styleButton.removeClass('turn-off');
			styleButton.addClass('turn-on');
		}
	});


	$('.start-box').on('click', function(){
		initGame();
	});
	
	$('.red').on('click', function(){
		flashGameColor(this, 1);
	});

	$('.green').on('click', function() {
		flashGameColor(this, 2);
	});

	$('.yellow').on('click', function() {
		flashGameColor(this, 3);
	});

	$('.blue').on('click', function() {
		flashGameColor(this, 4);
	});

	function flashGameColor(element, soundSequence) {
		$(element).switchClass("normal", "light", 200, "easeInOutQuad");		
		var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound' + soundSequence + '.mp3');
		audio.play();
		$(element).switchClass("light", "normal", 200, "easeInOutQuad");	
	}

	var randomPlays = [];
	var playerTurns = [];
	var gameElements = {'.red': 1, '.green': 2, '.yellow': 3, '.blue': 4};
	
	function initGame(){
		randomPlays = [];
		playerTurns = [];
		$(".red").off('disabled', 'disabled');
		computerTurn();
	}

	function computerTurn(){		
		var gameElementsKeys = Object.keys(gameElements);		
		randomPlays.push(gameElementsKeys[Math.floor(Math.random() * gameElementsKeys.length)]);
		for(var key in randomPlays) {
			var randomKey = randomPlays[key];			
			flashGameColor(randomKey, gameElements[randomKey]);
		}
	}

});