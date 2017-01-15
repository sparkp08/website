/*jslint browser: true,
white: true,
plusplus: true*/
/*global $, jQuery, alert*/


var period = document.getElementById("period");
var periodValue = period.value;
var newPeriod;
var hoveredId;
var hoveredMonth;

//adds color to each county based on it's unemployement percentage. 
//using forEach runs through an array that's passed as the argument array. 
//it's looking for items in the array that match the date that's passed as the second argument.

function addColor(array, date) {
    "use strict"; 
    $(function($) {
    array.forEach(function (item, index, array) {
        var itemZero = item[0];
        var item0 = document.getElementById(itemZero);
         var item1 = item[1];
         newPeriod = item[6];
         if (item0 != null && newPeriod === date) {
            if (item0.hasAttribute('class')) {
                item0.removeAttribute('class');}
            if (item1 <= 2.5) {
                item0.setAttribute('class', 'color025');
            } else if (item1 > 2.5 && item1 <= 5.0) {
                item0.setAttribute('class','color255');
            } else if (item1 > 5.0 && item1 <= 7.5) {
                item0.setAttribute('class','color575');
            } else if (item1 > 7.5 && item1 <= 10){
                item0.setAttribute('class','color7510');
            }
            else {
                item0.setAttribute('class','color10up');
            }
         
        }
      }); 
    });
}

//runs when a county is hovered over. 
//displays information in a tooltip box based on the hovered county's id#

function populateTooltip() {
    "use strict";
        countiesArray.forEach(function(item, index, array) {
        var i = 0;
        if(item[0] === hoveredId && item[6] === hoveredMonth) {
            $("#tooltip").html(
                "<h3>" + item[2] + "</h3>" + 
                "<hr />" +
                "<div><b>Unemployment Rate:</b> <span class='value'>" + item[1] + "%</span></div>" +
                "<div><b>Labor Force:</b> <span class='value'>" + item[3] + "</span></div>" +
                "<div><b>Employed:</b> <span class='value'>" + item[4] + "</span></div>" +
                "<div><b>Unemployed:</b> <span class='value'>" + item[5] + "</span></div>");
        }
        else {
            
        }
    });
}

//is redefined each time a county is hovered over.
// and fires the populateTooltip funtion to show the tooltip with accurate data

var tooltipPlacement = $(".cls-1").hover(function(Event) {
                
                //calls populate tooltooltip with current data period
                hoveredId = $(this).attr("id"); 
                hoveredMonth = $("#period").val();
                populateTooltip();
                //defines current mouse location in relation to the border in order to ensure tooltip is always visible
                var tooltip = $("#tooltip");
                tooltip.toggleClass("tooltipShow");
                var width = window.innerWidth;
                var distanceX  = Event.clientX;
                var differenceX = width - distanceX;
                var height = window.innerHeight;
                var distanceY = Event.clientY;
                var differenceY = height - distanceY;
                //places tooltip in different locations relative to the mouse so that it's always in view
                if (width < 500) {
                    tooltip.css({"position": "relative", "top": 0, "left": 0});
                } else {

                    if (differenceX < 300 && differenceY < 260) {
                         tooltip.css({"position": "fixed", "top": -250 + Event.clientY, "left": -350 + Event.clientX });  
                     } 
                     else if (differenceX < 300) {
                        tooltip.css({"position": "fixed", "top": -75 + Event.clientY, "left": -350 + Event.clientX });
                     }
                     else if (differenceY < 260) {
                         tooltip.css({"position": "fixed", "top": -200 + Event.clientY, "left": 25 + Event.clientX });
                     }
                     else if (distanceY < 250) {
                         tooltip.css({"position": "fixed", "top": 10 + Event.clientY, "left": 25 + Event.clientX });
                     }
                     else {
                        tooltip.css({"position": "fixed", "top": -75 + Event.clientY, "left": 25 + Event.clientX });
                     }
             }
    });

//runs when the previous button is pressed and goes to the previous month in the dropdown
$("#previous").click(function(){
    var currentMonth = $("#period option:selected")[0];
    var prevMonth = $("#period option:selected").prev()[0];
    var prevMonthValue = prevMonth.value;
    currentMonth.removeAttribute("selected");
    prevMonth.setAttribute("selected", "selected");
    addColor(countiesArray, prevMonthValue);
});
//runs when the next button is pressed and goes to the next month in the dropdown
$("#next").click(function(){
    var currentMonth = $("#period option:selected")[0];
    var nextMonth = $("#period option:selected").next()[0];
    var nextMonthValue = nextMonth.value;
    currentMonth.removeAttribute("selected");
    nextMonth.setAttribute("selected", "selected");
    addColor(countiesArray, nextMonthValue);
});
//runs when a month is selected specifically from the dropdown.
period.addEventListener("change", function() {
    var currentMonth = $("#period option:selected")[0].value;
    addColor(countiesArray, currentMonth); }, false);
//colors the county when the page loadas initially
function start() {
  addColor(countiesArray, periodValue);
}
//calls for the function start with the requestAnimtionFrame method
window.requestAnimationFrame(start);

