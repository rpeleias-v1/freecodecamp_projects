$(document).ready(function() {
  var entries = [];
  var total = 0;
  var temp = '';
  
  $("button").on('click', function() {
    var value = $(this).text();
    
    if(!isNaN(value) || value === '.') {
      temp += value;    
      $('.operation-area').html(temp.substring(0,10));
    } else if (value === 'AC'){
      entries = [];
      total = 0;
      temp = '';
      $('.operation-area').html('');
    } else if(value === 'CE') {
      temp = '';
      $('.operation-area').html('');
    } else if( value === 'X') {
      entries.push(temp);
      entries.push('*');
      temp = '';
    } else if( value === '/') {
      entries.push(temp);
      entries.push('/');
      temp = '';
    } else if( value === '%') {
      entries.push(temp);
      entries.push('%');
      temp = '';
    } else if(value === '=') {
      entries.push(temp);

      var nt = Number(entries[0]);
      for( var i = 1; i < entries.length; i++) {
        var nextNum = Number(entries[i + 1]);
        var symbol = entries[i];

        if(symbol === '+') {
          nt += nextNum;
        } else if(symbol === '-') {
          nt -= nextNum;
        } else if(symbol === '/') {
          nt /= nextNum;
        } else if(symbol === '*') {
          nt *= nextNum;
        } else if(symbol === '%') {
          nt %= nextNum;
        }

        $('.operation-area').html(nt);
        entries = [];
        temp = '';

      }
    } else {
      entries.push(temp);
      entries.push(value);
      temp = '';
    }
  })
});