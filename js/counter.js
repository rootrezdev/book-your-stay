var $apbutton = $('.adults .p-btn');
var $ambutton = $('.adults .m-btn');
var $acounter = $('.adults .counter');

var $cpbutton = $('.children .p-btn');
var $cmbutton = $('.children .m-btn');
var $ccounter = $('.children .counter');

function guestTotals() {
  var $tot = parseInt(+$acounter.val() + +$ccounter.val());
    $(".guest-total span").text($tot);
}

$apbutton.click(function(){
  if ( $acounter.val() <= 9 ) {
    $acounter.val( parseInt($acounter.val()) + 1 );
    guestTotals();
  }
});

$ambutton.click(function(){
  if ( $acounter.val() >= 2 ) {
    $acounter.val( parseInt($acounter.val()) - 1 );
    guestTotals();
  }
});

$cpbutton.click(function(){
  if ( $ccounter.val() <= 9 ) {
    $ccounter.val( parseInt($ccounter.val()) + 1 );
    guestTotals();
  }
});

$cmbutton.click(function(){
  if ( $ccounter.val() >= 1 ) {
    $ccounter.val( parseInt($ccounter.val()) - 1 );
    guestTotals();
  }
});