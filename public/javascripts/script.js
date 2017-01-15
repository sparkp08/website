var spinner = document.getElementById('spinner');
var spinnerImgs = document.querySelectorAll('.spinnerimg');
var ids = ['first', 'second', 'third', 'fourth', 'fifth'];
var idStart = ['first1', 'second2', 'third3', 'fourth4', 'fifth5'];
var i;
var form = document.getElementById('spinnerform');
var elements = form.elements;
var formInput = document.getElementsByClassName('formInput');
var tt = elements.transform; 
var ts = attrib1;
var tm = attrib2;
var te = attrib3;
var ad = animationDuration;
var tv = timing;
var ic = iterationCount;
var animationDirection = direction;
var head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
var oldColor = colorTheme.value;

$('#one#attrib1').defaultValue = '0deg';

function changeKeyframe1(tt, ts, tm, te) {   
    
    var newKeyframe = "@keyframes one { 0% { transform: " + tt + "(" + ts + "); } 50% { transform: " + tt + "(" + tm + "); } 100% { transform: " + tt + "(" + te + "); } }";

    if (style.styleSheet){
      style.styleSheet.cssText = keyframe;
    } else {
      style.appendChild(document.createTextNode(newKeyframe));
    }    
}

function changeKeyframe2(tt, ts, tm, te) {
    
    var newKeyframe = "@keyframes two { 0% { transform: " + tt + "(" + ts + "); } 50% { transform: " + tt + "(" + tm + "); } 100% { transform: " + tt + "(" + te + "); } }";
        
    if (style.styleSheet){
      style.styleSheet.cssText = keyframe;
    } else {
      style.appendChild(document.createTextNode(newKeyframe));
    }    
}

function changeKeyframe3(tt, ts, tm, te) {
    
    var newKeyframe = "@keyframes three { 0% { transform: " + tt + "(" + ts + "); } 50% { transform: " + tt + "(" + tm + "); } 100% { transform: " + tt + "(" + te + "); } }";
        
    if (style.styleSheet){
      style.styleSheet.cssText = keyframe;
    } else {
      style.appendChild(document.createTextNode(newKeyframe));
    }    
}

function changeKeyframe4(tt, ts, tm, te) {
    
    var newKeyframe = "@keyframes four { 0% { transform: " + tt + "(" + ts + "); } 50% { transform: " + tt + "(" + tm + "); } 100% { transform: " + tt + "(" + te + "); } }";
        
    if (style.styleSheet){
      style.styleSheet.cssText = keyframe;
    } else {
      style.appendChild(document.createTextNode(newKeyframe));
    }    
}

function changeKeyframe5(tt, ts, tm, te) {
    
    var newKeyframe = "@keyframes five { 0% { transform: " + tt + "(" + ts + "); } 50% { transform: " + tt + "(" + tm + "); } 100% { transform: " + tt + "(" + te + "); } }";
        
    if (style.styleSheet){
      style.styleSheet.cssText = keyframe;
    } else {
      style.appendChild(document.createTextNode(newKeyframe));
    }    
}

function changeAnimation(ad) {
    var animationTime = "#first { animation-duration: " + ad + "ms} #second { animation-duration: " + ad + "ms} #third { animation-duration: " + ad + "ms} #fourth { animation-duration: " + ad + "ms} #fifth { animation-duration: " + ad + "ms}";
    
    if (style.styleSheet){
          style.styleSheet.cssText = animationTime;
        } else {
          style.appendChild(document.createTextNode(animationTime));
    } 
}

function changeTiming(tv) {
    $('#first').css('animation-timing-function', tv);
    $('#second').css('animation-timing-function', tv);
    $('#third').css('animation-timing-function', tv);
    $('#fourth').css('animation-timing-function', tv);
    $('#fifth').css('animation-timing-function', tv);
}

function changeIterations(ic) {
    $('#first').css('animation-iteration-count', ic);
    $('#second').css('animation-iteration-count', ic);
    $('#third').css('animation-iteration-count', ic);
    $('#fourth').css('animation-iteration-count', ic);
    $('#fifth').css('animation-iteration-count', ic);
}

function changeDirection(animationDirection) {
    $('#first').css('animation-direction', animationDirection);
    $('#second').css('animation-direction', animationDirection);
    $('#third').css('animation-direction', animationDirection);
    $('#fourth').css('animation-direction', animationDirection);
    $('#fifth').css('animation-direction', animationDirection);
}


function changeColor(newColor) {
    if (oldColor != newColor){
    $('#spinner').switchClass(oldColor, newColor);
    $('#attributes').switchClass(oldColor, newColor);
    oldColor = newColor;
    }
}

function spinIt() {
    var playState = $('.spinnerimg').css('animation-play-state');
    if (playState === 'paused') {
        playState = $('.spinnerimg').css('animation-play-state', 'running');
    } 
}

function stopIt() {
    var playState = $('.spinnerimg').css('animation-play-state');
    if (playState === 'running') {
        playState = $('.spinnerimg').css('animation-play-state', 'paused');
    }
}

ad.defaultValue = 1000;
style.type = 'text/css';
head.appendChild(style);

form.addEventListener('submit', function (e) {
    e.preventDefault();
    changeKeyframe1(tt.value, ts[0].value, tm[0].value, te[0].value);
    changeKeyframe2(tt.value, ts[1].value, tm[1].value, te[1].value);
    changeKeyframe3(tt.value, ts[2].value, tm[2].value, te[2].value);
    changeKeyframe4(tt.value, ts[3].value, tm[3].value, te[3].value);
    changeKeyframe5(tt.value, ts[4].value, tm[4].value, te[4].value);
    changeAnimation(ad.value);
    spinIt();
    changeColor(colorTheme.value);
    changeTiming(tv.value);
    changeIterations(ic.value);
    changeDirection(animationDirection.value);
}, false);

for (i=0; i<formInput.length; i++) {
formInput[i].addEventListener('blur', function (e) {
    
    changeKeyframe1(tt.value, ts[0].value, tm[0].value, te[0].value);
    changeKeyframe2(tt.value, ts[1].value, tm[1].value, te[1].value);
    changeKeyframe3(tt.value, ts[2].value, tm[2].value, te[2].value);
    changeKeyframe4(tt.value, ts[3].value, tm[3].value, te[3].value);
    changeKeyframe5(tt.value, ts[4].value, tm[4].value, te[4].value);
    changeAnimation(ad.value);
    spinIt();
    changeColor(colorTheme.value);
    changeTiming(tv.value);
    changeIterations(ic.value);
    changeDirection(animationDirection.value);
}, true);
}
spinner.addEventListener('click', function (e) {
    changeAnimation(ad.value);
    var playState = $('.spinnerimg').css('animation-play-state');
    if (playState === 'running') {
        playState = $('.spinnerimg').css('animation-play-state', 'paused');
        } else {
        spinIt();
        }
    }
    , false);