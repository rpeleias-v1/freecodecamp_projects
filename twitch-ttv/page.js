$(document).ready(function() {

	$.paramsPage = {
		allElements: {},
		onlineElements: {},
		offlineElements: {}
	}

	function loadStreamers() {
		var streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "medrybw"];
		var listContent = [];	
		streamers.forEach(function(streamer) {	
			var usersURI = 'https://api.twitch.tv/kraken/users/' + streamer + '?callback=?';
			$.ajaxSetup({
		        async: false
		    });
			$.getJSON(usersURI, function(data) {
				var userLogo = data.logo === null ? "http://placehold.it/50x50" : data.logo;
				var username = data.display_name;							
				var listElement = '<li class="list-group-item">';
				listElement += '<span class="badge left"><img class="img-responsive img-circle img-size" src="' + userLogo + '"></span>' ; 
				listElement += '<span class="username"><a href="http://twitch.tv/' + username + '" target="_blank" ><p>'+ data.display_name + '</p></a></span>';

				var streamsURI = 'https://api.twitch.tv/kraken/streams/' + streamer + '?callback=?';
				$.getJSON(streamsURI, function(data) {					
					listElement += data.stream !== null ? ' <span class="online-user-details"><p>' + data.stream.game + '</p></span>' : '';														
					listElement += data.stream === null ? '<span class="badge right"><i class="fa fa-exclamation-circle"></i></span>' : '<span class="badge right"><i class="fa fa-check-circle"></i></span>';														
					listElement += '</li></a>';
					$.paramsPage.allElements[username] = listElement;
					$(".list-group").append(listElement);
					if(data.stream === null) {
						$.paramsPage.offlineElements[username] = listElement;
					} else {
						$.paramsPage.onlineElements[username] = listElement;
					}
				});						
			});
		});
	}

	loadStreamers();

	$('#all-users').on('click', function() {
		$(".list-group").empty();
		$.each($.paramsPage.allElements, function(i, listElement) {
			$(".list-group").append(listElement);
		});	
	});

	$('#online-users').on('click', function() {
		$(".list-group").empty();
		$.each($.paramsPage.onlineElements, function(i, listElement) {
			$(".list-group").append(listElement);
		});		
	});

	$('#offline-users').on('click', function() {
		$(".list-group").empty();
		$.each($.paramsPage.offlineElements, function(i, listElement) {
			$(".list-group").append(listElement);
		});			
	});

	$("#search-input").on('input', function() {
		$(".list-group").empty();
		$.each($.paramsPage.allElements, function(i, listElement) {			
			if(i.indexOf($("#search-input").val()) > -1) {
				$(".list-group").append(listElement);	
			}			
		});	
	})
});