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
        var fipsNumber = item[0];
        var fipsObject = document.getElementById(fipsNumber);
        var unemploymentRate = item[6];
        var month = item[2];
         if (fipsObject != null && month === date) {
            if (fipsObject.hasAttribute('class')) {
                fipsObject.removeAttribute('class');}
            if (unemploymentRate <= 2.5) {
                fipsObject.setAttribute('class', 'color025');
            } else if (unemploymentRate > 2.5 && unemploymentRate <= 5.0) {
                fipsObject.setAttribute('class','color255');
            } else if (unemploymentRate > 5.0 && unemploymentRate <= 7.5) {
                fipsObject.setAttribute('class','color575');
            } else if (unemploymentRate > 7.5 && unemploymentRate <= 10){
                fipsObject.setAttribute('class','color7510');
            }
            else {
                fipsObject.setAttribute('class','color10up');
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
        if (item[0] === hoveredId && item[2] === hoveredMonth) {
            tooltip.innerHTML = 
                "<h3>" + item[1] + "</h3>" + 
                "<hr />" +
                "<div><b>Unemployment Rate:</b> <span class='value'>" + item[6] + "%</span></div>" +
                "<div><b>Labor Force:</b> <span class='value'>" + item[3] + "</span></div>" +
                "<div><b>Employed:</b> <span class='value'>" + item[4] + "</span></div>" +
                "<div><b>Unemployed:</b> <span class='value'>" + item[5] + "</span></div>";
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
    } 
    else {
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
var previousItem = document.getElementById("previous");
var nextItem = document.getElementById("next");
var list = document.getElementById("period");
previousItem.addEventListener("click", function(){
    var currentMonth = list.options[list.selectedIndex];
    var prevMonth = list.options[list.selectedIndex].previousElementSibling;
    var prevMonthValue = prevMonth.value;
    currentMonth.removeAttribute("selected");
    prevMonth.setAttribute("selected", "selected");
    addColor(countiesArray, prevMonthValue);
}, false);

//runs when the next button is pressed and goes to the next month in the dropdown
nextItem.addEventListener("click", function(){
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
    blueCounties.forEach(county => county.addEventListener("mouseenter", function(event) {showTooltip(event)}));
    lightBlueCounties.forEach(county => county.addEventListener("mouseenter", function(event) {showTooltip(event)}));
    yellowCounties.forEach(county => county.addEventListener("mouseenter", function(event) {showTooltip(event)}));
    orangeCounties.forEach(county => county.addEventListener("mouseenter", function(event) {showTooltip(event)}));
    redCounties.forEach(county => county.addEventListener("mouseenter", function(event) {showTooltip(event)}));
}
//calls for the function start with the requestAnimtionFrame method
window.requestAnimationFrame(start);
