var boxesHeight = $('.boxes').height();
var boxesWidth =  $('.boxes').width();
var boxesHigh = Math.floor(boxesHeight / 50);
var boxesWide = Math.floor(boxesWidth / 50);
var oneBox = "<div class='box250'></div>";
var i = 0;
var b = 0;


function placeRows() {
    while(i < boxesHigh) {
        $('.boxes').append("<div class='row'></div>");
        
        i++;
    }
}

function placeBoxesWide() {
    while (b < boxesWide) {
		$('.row').append(oneBox);
		b++;
	}
}

placeRows();
placeBoxesWide();
$('.row .box250:odd').addClass('odd');
