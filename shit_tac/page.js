$(document).ready(function() {

	function Game(){
		this.playersImage = { 'shit': 'http://pix.iemoji.com/images/emoji/apple/8.3/256/pile-of-poo.png', 'skull': 'http://pix.iemoji.com/images/emoji/apple/ios-9/256/skull.png'}
		this.board = [],		
		this.player = '',
		this.computerPlayer = '';
		this.hasWinner = false;

		this.init = function() {
			this.board = [];
			this.player = '',
			this.computerPlayer = '';
			this.hasWinner = false;
			$('.row-column').remove();			
			for(var possibility = 0; possibility < 9; possibility++) {				
				var appendedDiv = $('<div class="col-xs-4 row-column" id="' + possibility + '"></div>');
				$('.square').append(appendedDiv);
				this.board[possibility] = {element: appendedDiv, player: ''};				
			}
			$('.col-xs-4').on('click', function() {				
				if(game.player === '' && game.computerPlayer === '') {
					alert("You can not play an empty game! Please, choose an emoticon to play it!");
					game.showPlayersOptions();
					game.init();
				} else {
					game.playerTurn(this);					
				}				
			});		
		}

		this.playerTurn = function(clickedElement) {
			if($(clickedElement).find("img").length <= 0) {
				$(clickedElement).prepend($('<img>',{id:'poop',src: this.playersImage[this.player], class: 'img-responsive img-size'}));	
				this.board[$(clickedElement).attr("id")].player = this.player;
				this.checkWinner(this.player);	
				if(this.hasWinner === true) {					
					this.showPlayersOptions();
					this.init();
				} else {
					this.computerTurn();			
				}				
			} else {
				if(this.allSpacesAreFilled() === true){
					alert("Drawed game! Please, try it again!");
					this.showPlayersOptions();
					this.init();
				} else{
					alert("You cannot choose a filled cell!");
				}				
			} 			
		}

		this.computerTurn = function() {	
			var notFilled = true;	
			if(this.allSpacesAreFilled() === true){
					this.showPlayersOptions();
					this.init();
			} else{
				while(notFilled && this.hasWinner === false) {
					var randomNumber = Math.round(Math.random() * (this.board.length - 1));
					var randomChoice = this.board[randomNumber];
					console.log(randomChoice.player);
					if(randomChoice.player === '') {
						$(randomChoice.element).prepend($('<img>',{id:'poop',src: this.playersImage[this.computerPlayer], class: 'img-responsive img-size'}));							
						this.board[randomNumber].player = this.computerPlayer;	
						this.checkWinner(this.computerPlayer);
						notFilled = false;						
						if(this.hasWinner === true) {
							this.showPlayersOptions();
							this.init();
						} 					
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

		this.checkWinner = function(player) {			
			if(this.checkCombination(0,1,2, player) === true) {
				this.alertWinner(player);
			} else if(this.checkCombination(3,4,5, player) === true)	{
				this.alertWinner(player);
			} else if(this.checkCombination(6,7,8, player) === true) {
				this.alertWinner(player);
			} else if(this.checkCombination(0,3,6, player) === true) {
				this.alertWinner(player);
			} else if(this.checkCombination(1,4,7, player) === true) {
				this.alertWinner(player);
			} else if(this.checkCombination(2,5,8, player) === true) {
				this.alertWinner(player);
			} else if(this.checkCombination(0,4,8, player) === true) {
				this.alertWinner(player);
			} else if(this.checkCombination(2,4,6, player) === true) {
				this.alertWinner(player);
			}		
		}

		this.checkCombination = function(comb1, comb2, comb3, player) {
			if(player !== '' && (this.board[comb1].player === player) && (this.board[comb2].player === player) && (this.board[comb3].player === player)) {
				return true;
			}
			return false;
		}

		this.alertWinner = function(player){
			var winner = player === this.player ? this.player : this.computerPlayer;
			alert("There is a winner! By unanimous decision the winner is: " + player.toUpperCase());
			this.hasWinner = true;			
		}
	};

	game = new Game();	
	game.showPlayersOptions();

	game.init();	
});