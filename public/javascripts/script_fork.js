var period = document.getElementById("period");
var periodValue = period.value;
var newPeriod;
var hoveredId;
var hoveredMonth;
var tooltip = document.getElementById('tooltip');


//adds color to each county based on it's unemployement percentage. 
//using forEach runs through an array that's passed as the argument array. 
//it's looking for items in the array that match the date that's passed as the second argument.

function addColor(array, date) {
    "use strict"; 
    (function() {
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
    })();
}

//runs when a county is hovered over. 
//displays information in a tooltip box based on the hovered county's id#

function populateTooltip() {
    "use strict";
        countiesArray.forEach(function(item, index, array) {
        var i = 0;
        if(item[0] === hoveredId && item[6] === hoveredMonth) {
            tooltip.innerHTML = 
                "<h3>" + item[2] + "</h3>" + 
                "<hr />" +
                "<div><b>Unemployment Rate:</b> <span class='value'>" + item[1] + "%</span></div>" +
                "<div><b>Labor Force:</b> <span class='value'>" + item[3] + "</span></div>" +
                "<div><b>Employed:</b> <span class='value'>" + item[4] + "</span></div>" +
                "<div><b>Unemployed:</b> <span class='value'>" + item[5] + "</span></div>";
        }
        else {
            
        }
    });
        var currentCounty = document.getElementById(hoveredId);
        currentCounty.addEventListener("mouseout", function() { tooltip.style.display = "none"; tooltip.classList.remove(hoveredId); }, false);
     }

function showTooltip(event) {
                "use strict";
                //calls populate tooltooltip with current data period
                hoveredId = event.target.id; 
                hoveredMonth = document.getElementById("period").value;
                populateTooltip();
                tooltip.style.display = "block";
                tooltip.classList.add(hoveredId);
                var width = window.innerWidth;
                var distanceX  = event.clientX;
                var differenceX = width - distanceX;
                var height = window.innerHeight;
                var distanceY = event.clientY;
                var differenceY = height - distanceY;
                //places tooltip in different locations relative to the mouse so that it's always in view
                if (width < 500) {
                    tooltip.style.position = "relative";
                    tooltip.style.top = "0";
                    tooltip.style.left = "0";
                } else {

                    if (differenceX < 300 && differenceY < 260) {
                         tooltip.style.position = "fixed"; 
                         tooltip.style.top = -250 + distanceY + "px"; 
                         tooltip.style.left = -350 + distanceX + "px";  
                     } 
                     else if (differenceX < 300) {
                       // tooltip.setAttribute("position: fixed; top:" + -75 + Event.clientY; + "left:" + -350 + Event.clientX);
                       tooltip.style.position = "fixed"; 
                         tooltip.style.top = -75 + distanceY + "px"; 
                         tooltip.style.left = -350 + distanceX + "px";  
                     }
                     else if (differenceY < 260) {
                         //tooltip.setAttribute({"position": "fixed", "top": -200 + Event.clientY, "left": 25 + Event.clientX });
                         tooltip.style.position = "fixed"; 
                         tooltip.style.top = -200 + distanceY + "px"; 
                         tooltip.style.left = 25 + distanceX + "px";   
                     }
                     else if (distanceY < 250) {
                         //tooltip.setAttribute({"position": "fixed", "top": 10 + Event.clientY, "left": 25 + Event.clientX });
                         tooltip.style.position = "fixed"; 
                         tooltip.style.top = 10 + distanceY + "px"; 
                         tooltip.style.left = 25 + distanceX + "px";    
                     }
                     else {
                        //tooltip.setAttribute("position": "fixed", "top": -75 + Event.clientY, "left": 25 + Event.clientX );
                        tooltip.style.position = "fixed"; 
                         tooltip.style.top = `${-75 + distanceY}px`; 
                         tooltip.style.left = `${25 + distanceX}px`;   
                     }
             }
    }


var countyClass;

//runs when the previous button is pressed and goes to the previous month in the dropdown
let previous = document.getElementById("previous");
let next = document.getElementById("next");
var list = document.getElementById("period");
previous.addEventListener("click", function(){
    var currentMonth = list.options[list.selectedIndex];
    var prevMonth = list.options[list.selectedIndex].previousElementSibling;
    var prevMonthValue = prevMonth.value;
    currentMonth.removeAttribute("selected");
    prevMonth.setAttribute("selected", "selected");
    addColor(countiesArray, prevMonthValue);
}, false);

//runs when the next button is pressed and goes to the next month in the dropdown
next.addEventListener("click", function(){
    var currentMonth = list.options[list.selectedIndex];
    var nextMonth = list.options[list.selectedIndex].nextElementSibling;
    var nextMonthValue = nextMonth.value;
    currentMonth.removeAttribute("selected");
    nextMonth.setAttribute("selected", "selected");
    addColor(countiesArray, nextMonthValue);
});

//runs when a month is selected specifically from the dropdown.
period.addEventListener("change", function() {
    var currentMonth = list.options[list.selectedIndex].value;
    addColor(countiesArray, currentMonth); }, false);
//colors the county when the page loadas initially
function start() {
  addColor(countiesArray, periodValue);
  var blueCounties = document.querySelectorAll('.color025');
  var lightBlueCounties = document.querySelectorAll('.color255');
  var yellowCounties = document.querySelectorAll('.color575');
  var orangeCounties = document.querySelectorAll('.color7510');
  var redCounties = document.querySelectorAll('.color10up');
  blueCounties.forEach(county => county.addEventListener("mouseenter", function() {showTooltip(event)}));
  lightBlueCounties.forEach(county => county.addEventListener("mouseenter", function() {showTooltip(event)}));
  yellowCounties.forEach(county => county.addEventListener("mouseenter", function() {showTooltip(event)}));
  orangeCounties.forEach(county => county.addEventListener("mouseenter", function() {showTooltip(event)}));
  redCounties.forEach(county => county.addEventListener("mouseenter", function() {showTooltip(event)}));
  
}
//calls for the function start with the requestAnimtionFrame method
window.requestAnimationFrame(start);


