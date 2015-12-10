$(document).ready(function() {

	function Game(){
		this.playersImage = { 'shit': 'http://pix.iemoji.com/images/emoji/apple/8.3/256/pile-of-poo.png', 'skull': 'http://pix.iemoji.com/images/emoji/apple/ios-9/256/skull.png'}
		this.board = [],		
		this.player = '',
		this.computerPlayer = '';

		this.init = function() {
			this.board = [];
			this.player = '',
			this.computerPlayer = '';
			$('.square').empty();			
			for(var possibility = 0; possibility < 9; possibility++) {				
				var appendedDiv = $('<div class="col-xs-4 row-column" id="' + possibility + '"></div>');
				$('.square').append(appendedDiv);
				this.board[possibility] = {element: appendedDiv, player: ''};				
			}			
		}

		this.playerTurn = function(clickedElement) {
			if($(clickedElement).find("img").length <= 0) {
				$(clickedElement).prepend($('<img>',{id:'poop',src: game.playersImage[game.player], class: 'img-responsive img-size'}));	
				this.board[$(clickedElement).attr("id")].player = game.player;						
				this.computerTurn();		
			}  else {
				if(this.allSpacesAreFilled() === true){
					alert("Drawed game! Please, try it again!");
					game.showPlayersOptions();
					this.init();
				}else{
					alert("You cannot choose a filled cell!");
				}				
			} 			
		}

		this.computerTurn = function() {	
			var notFilled = true;	
			if(this.allSpacesAreFilled() === true){
					alert("Drawed game! Please, try it again!");
					game.showPlayersOptions();
					this.init();
			}else{
				while(notFilled) {
					var randomNumber = Math.round(Math.random() * (this.board.length - 1));
					var randomChoice = this.board[randomNumber];
					console.log(randomChoice.player);
					if(randomChoice.player === '') {
						$(randomChoice.element).prepend($('<img>',{id:'poop',src: this.playersImage[this.computerPlayer], class: 'img-responsive img-size'}));	
						this.board[randomNumber].player = game.computerPlayer;	
						notFilled = false;					
					}
				}	
			}							
		}

		this.allSpacesAreFilled = function(){
			var spacesFilled = this.board.filter(function(element) {
				return element.player == '';
			});			
			if(spacesFilled.length > 0){
				return false;
			} else{
				return true;
			}
		}

		this.showPlayersOptions = function() {
			$('#iconModal').modal({
				show: true,
				backdrop: true,
				keyboard: false
			});
			$('#shitButton').one('click', function () {
				game.player = "shit";
				game.computerPlayer = "skull";
			});
			$('#skullButton').one('click', function () {
				game.player = "skull";
				game.computerPlayer = "shit";
			});
		}
	};

	game = new Game();	
	game.showPlayersOptions();

	game.init();
  
	$('.row-column').on('click', function() {		
		game.playerTurn(this);				
	});
});