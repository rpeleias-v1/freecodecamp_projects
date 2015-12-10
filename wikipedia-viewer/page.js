$(document).ready(function() {

	function searchWikipedia() {		
    	var searchInput = $('#search-input').val();  
    	$('#search-content').empty();  	

		$.ajax({
		  url: '//en.wikipedia.org/w/api.php',
		  data: { action: 'query', list: 'search', srsearch: searchInput, format: 'json' },
		  dataType: 'jsonp',
		  success: function (data) {
		  	data.query.search.forEach(function(result) {		  		
		  		var searchResult = $('<div>', {class: "search-result"});
		  		searchResult.append($('<div>', {class: "result-title"}).append($('<h2>').html(result.title)));
		  		searchResult.append($('<div>', {class: "result-summary"}).append($('<p>').html(result.snippet)));
		  		var rowDiv = $('<div>', {class: "col-md-12"}).append(searchResult);
		  		rowDiv.slideUp();
		  		$('#search-content').append(rowDiv);
		  	});		    
		  }
		});
	}
  
	$("#search-input").on('keydown', function(e) {
		if(e.which === 13) {
			searchWikipedia();
		}
	});

	$(".ui-autocomplete li").on('keypress', function(e) {
		if(e.which === 13) {
			searchWikipedia();
		}
	});

	$("#search-input").autocomplete({		
	    source: function(request, response) {
	        $.ajax({
	            url: "http://en.wikipedia.org/w/api.php",
	            dataType: "jsonp",
	            data: {
	                'action': "opensearch",
	                'format': "json",
	                'search': request.term
	            },
	            success: function(data) {
	                response(data[1]);	                
	            }
	        });
	    }
	});


  $(".input-group-addon").on('click', function() {
  	$('#search-content').empty(); 
  	$('#search-input').val(""); 
  })
});