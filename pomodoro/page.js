$(document).ready(function() {

  var secondWorkTime = 59;
  $("#work-time-box .sum").on('click', function() {   	
  	if ($('.clock-type').text() === 'Work time') {
  		$(".clock-value").text(parseInt($("#work-time-box .number h2").text()) + 1);
		secondWorkTime = 59;
		$("#work-time-box .number h2").text(parseInt($("#work-time-box .number h2").text()) + 1);	 
  	}	
  });
  
   $("#work-time-box .minus").on('click', function() {
   	 if (parseInt($("#work-time-box .number h2").text()) > 1 && $('.clock-type').text() === 'Work time'){
	     $(".clock-value").text(parseInt($("#work-time-box .number h2").text()) - 1);
	     secondWorkTime = 59;
	     $("#work-time-box .number h2").text(parseInt($("#work-time-box .number h2").text()) - 1);
 	 }
  });

   $("#break-time-box .sum").on('click', function() {
   	 secondWorkTime = 59;
     $("#break-time-box .number h2").text(parseInt($("#break-time-box .number h2").text()) + 1);
     if($('.clock-type').text() === 'Break time') {
     	$(".clock-value").text(parseInt($("#break-time-box .number h2").text()));
     }
  });
  
   $("#break-time-box .minus").on('click', function() {
   	 if (parseInt($("#break-time-box .number h2").text()) > 1) {
   	 	secondWorkTime = 59;
     	$("#break-time-box .number h2").text(parseInt($("#break-time-box .number h2").text()) - 1);
     	if($('.clock-type').text() === 'Break time') {
     		$(".clock-value").text(parseInt($("#break-time-box .number h2").text()));
     	}
 	 }
  });   

   var timerStarted = false;
   var timer = null;

   $(".timer").on('click', function() {   	
   	if(timerStarted) {   		   		
   		$('.button').prop('disabled', false);
		clearTimeout(timer);
		timerStarted = false;	
   	} else {   		
   		$('.button').prop('disabled', true);
   		if($('.clock-type').text() === 'Work time') {
   			startWorkTime();	
   		} else {
   			startBreakTime();
   		}
   		
   		timerStarted = true;
   	}
   });

  
   function changeTitle(selectedClock) {
	 if (selectedClock === 'work-time') {
	 	$('.clock-type').text('Work time');
	 }
	 if (selectedClock === 'break-time') {
	 	$('.clock-type').text('Break time');
	 }
   }

   var secondWorkTime = 59;
   function startWorkTime() {   	 
   	 var minuteWorkTime = parseInt($(".clock-value").text());
   	 if (secondWorkTime < 0 || secondWorkTime === 59) {
   	 	minuteWorkTime = minuteWorkTime - 1;
   	 	secondWorkTime = 59;
   	 }
   	 if (secondWorkTime < 10) {
   	 	secondWorkTime = '0' + secondWorkTime;
   	 }
     $(".clock-value").text(minuteWorkTime + ':' + secondWorkTime);
     secondWorkTime = secondWorkTime - 1;
     if ($(".clock-value").text() === '0:00') {
     	$(".clock-value").text($("#break-time-box .number h2").text());
     	changeTitle('break-time');      	
     	secondWorkTime = 59;
     	startBreakTime();
     }
     else {
     	timer = setTimeout(startWorkTime, 1000);		
     }
   }

   function startBreakTime() {     	 
   	 var minuteBreakTime = parseInt($(".clock-value").text()); 
   	 if (secondWorkTime < 0 || secondWorkTime === 59) {
   	 	minuteBreakTime = minuteBreakTime - 1;
   	 	secondWorkTime = 59;
   	 }
   	 if (secondWorkTime < 10) {
   	 	secondWorkTime = '0' + secondWorkTime;
   	 }
     $(".clock-value").text(minuteBreakTime + ':' + secondWorkTime);
     secondWorkTime = secondWorkTime - 1;	
     if ($(".clock-value").text() === '0:00') {     	
     	$(".clock-value").text($("#work-time-box .number h2").text());   
     	changeTitle('work-time');  
     	secondWorkTime = 59;  	
     	startWorkTime();	
     }
     else {
     	timer = setTimeout(startBreakTime, 1000);		
     }
   }  
});