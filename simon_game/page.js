$(document).ready(function() {

	$("#power-button").on('click', function(){
		var styleButton = $(this).children('.style-button');
		if(styleButton.hasClass('turn-on')) {
			styleButton.removeClass('turn-on');
			styleButton.addClass('turn-off');
			$("#count-input").text('--');
		} else if(styleButton.hasClass('turn-off')) {
			styleButton.removeClass('turn-off');
			styleButton.addClass('turn-on');
			$("#count-input").text('');
		}
	});


	$('.start-box').on('click', function(){
		initGame();
	});
	
	$('.red').on('click', function(){
		playerTurn(this, 1);
	});

	$('.green').on('click', function() {
		playerTurn(this, 2);		
	});

	$('.yellow').on('click', function() {
		playerTurn(this, 3);		
	});

	$('.blue').on('click', function() {
		playerTurn(this, 4);		
	});
	
	var randomPlays = [];
	var playerTurns = [];
	var gameElements = {'.red': 1, '.green': 2, '.yellow': 3, '.blue': 4};	
	
	function initGame(){
		randomPlays = [];
		playerTurns = [];	
		addRandomComputerTurn();	
		computerTurn();
	}

	function addRandomComputerTurn() {
		var gameElementsKeys = Object.keys(gameElements);		
		randomPlays.push(gameElementsKeys[Math.floor(Math.random() * gameElementsKeys.length)]);
		console.log(randomPlays);
	}

	function computerTurn(){					
		for(var count = 0; count < randomPlays.length; count++) {			
			var randomKey = randomPlays[count];				
			(function(randomKey) {
				setTimeout(function(){flashGameColor(randomKey, gameElements[randomKey])}, 1000 * (count + 1));	
			})(randomKey);			
		}
		$('.wrap-options').removeClass('unclickable');
		$('.wrap-options').addClass('clickable');
	}

	function playerTurn(clickedElement, soundSequence){
		var clickedColor = '.' + $(clickedElement).attr('class').split(' ')[1];		
		playerTurns.push(clickedColor);		
		//$('.wrap-options').removeClass('clickable');
		//$('.wrap-options').addClass('unclickable');
		
		if (compareSoundEquality() === true) {
			flashGameColor(clickedElement, soundSequence);					
			if(playerTurns.length === randomPlays.length) {					
				addRandomComputerTurn();
				playerTurns = [];
				$("#count-input").text(randomPlays.length);
				computerTurn();		
			}			
		}
		else {
			alert("Wrong choice! Try it again!");
			playerTurns = [];
			computerTurn();
		}					
	}

	function flashGameColor(element, soundSequence) {		
		$(element).switchClass("normal", "light", 300, "easeInOutQuad");				
		var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound' + soundSequence + '.mp3');
		audio.play();
		$(element).switchClass("light", "normal", 300, "easeInOutQuad");						
	}

	function compareSoundEquality() {			
		var matched = true;
		var playerTurnsString = '';
		var randomPlaysString = '';		

		for(var count = 0; count < playerTurns.length; count++) {
			playerTurnsString += playerTurns[count];
			randomPlaysString += randomPlays[count];
			console.log(playerTurnsString);
			console.log(randomPlaysString);
			if(playerTurns[count] !== randomPlays[count]) {
				matched = false;
				break;
			}
		}
		return matched;		
	}
});