/*

Red/Green Isoluminance Pretest plugin for jsPsych
*/

jsPsych.plugins["ISO"]=(function(){
var plugin = {};

plugin.trial=function(display_element,trial) {


  trial=jsPsych.pluginAPI.evaluateFunctionParameters(trial);
  trial.dot_radius=trial.dot_radius || 40;
  trial.dot_color = trial.dot_color || "rgb(180,180,180)";
  trial.aperture_width=window.innerWidth;
  trial.aperture_height=window.innerHeight;
  trial.aperture_center_x=trial.aperture_center_x || window.innerWidth/2;
  trial.aperture_center_y=trial.aperture_center_y || window.innerHeight/2;
  trial.fixation_cross=false;
  trial.background_color=trial.background_color || "rgb(127,127,127)";

  var dotRadius=trial.dot_radius;
  var apertureWidth = trial.aperture_width;
  var apertureHeight = trial.aperture_height;
  var apertureCenterX=trial.aperture_center_x;
  var apertureCenterY=trial.aperture_center_y;
  var backgroundColor = trial.background_color;
  var moveDistance = trial.move_distance;
  var dotColor = trial.dot_color;
  var colorStr="red";
//variables from the matlab code
  var step = .2; //step size to vary color matches
  var initRed = .58;
  var initGreen = .55;
  var ticks = 2;
  var cycles = 16;
  var trials = 20;
  var ifi = .0167 //hardcoded interframe interval for 60 fps
  var redFactor=initRed;
  var greenFactor=initGreen;
//

//some code to determine fps
/*
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame;
}

var t = [];
function animate(now) {

    t.unshift(now);
    if (t.length > 10) {
        var t0 = t.pop();
        var fps = Math.floor(1000 * 10 / (now - t0));
        $('#fps').text(fps + ' fps');
    }

    window.requestAnimationFrame(animate);
};

window.requestAnimationFrame(animate);
*/
//



  var canvas = document.createElement("canvas");
  display_element.append(canvas);

  var body = document.getElementsByClassName("jspsych-display-element")[0];
  body.style.margin = 0;
  body.style.padding = 0;
  body.style.backgroundColor = backgroundColor;

  canvas.style.margin = 0;
  canvas.style.padding = 0;

  var ctx = canvas.getContext("2d");

  var width = canvas.width = window.innerWidth;
  var height = canvas.height = window.innerHeight;

  canvas.style.backgroundcolor = backgroundColor;

  var horizontalAxis;
  var verticalAxis;

  initializeApertureParameters();

  var frameRate=[];

  var numberOfFrames = 0;


      var dot = {
        x: 0, //x coordinate
        y: 0, //y coordinate
        vx: 0, //coherent x jumpsize (if any)
        vy: 0, //coherent y jumpsize (if any)
        latestXMove: 0, //Stores the latest x move direction for the dot (to be used in reinsertOnOppositeEdge function below)
        latestYMove: 0, //Stores the latest y move direction for the dot (to be used in reinsertOnOppositeEdge function below)
      };
      //randomly set the x and y coordinates


var stopDotMotion = false;
var firstFrame = true;
var timerHasStarted = false;
var timeoutID;
var Shrink=true;

animateDotFlicker();




  function draw() {
    ctx.clearRect(0,0,width,height)
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);



    if (firstFrame){
    ctx.fillStyle = dotColor
  }else{
    ctx.fillstyle = colorInfo.color
  }
    ctx.fill();



  }

  function initializeApertureParameters() {
    horizontalAxis=apertureWidth/2;
    verticalAxis=apertureHeight/2;
  }







  function updateDot() {
greenVal=255*greenFactor
redVal=255*redFactor
if (colorStr=="red"){
  dotColor='rgb(0,' + greenVal + '0)'
  colorStr="green";
} else if(colorStr=="green"){
  dotColor='rgb(' redVal + '0,0)'
  colorStr="red";
}
     return dotColor;
  }

  function randomNumberBetween(lowerBound,upperBound) {
    return lowerBound + Math.random() * (upperBound - lowerBound);
  }

  function animateDotFlicker() {
    var frameRequestID = window.requestAnimationFrame(animate);
    var previousTimeStamp;
    function animate() {
      if (stopDotMotion) {
        window.cancelAnimationFrame(frameRequestID);
      }
      else {
        frameRequestID = window.requestAnimationFrame(animate);
        if(firstFrame){
          previousTimeStamp = performance.now();
          firstFrame = false;
        }
        else{
          if( (!timerHasStarted) && (trial.trial_duration > 0)){
            timeoutID=window.setTimeout(end_trial,trial.trial_duration);
            timerHasStarted = true;
          }
          setInterval(function(){updateDot()},ticks*ifi)
          draw();
          var currentTimeStamp = performance.now();
          frameRate.push(currentTimeStamp-previousTimeStamp);
          previousTimestamp = currentTimeStamp;
        }
      }
    }
  }
//Dot Animations Functions End
function end_trial() {
  stopDotMotion = true;
  numberOfFrames = frameRate.length;
  var frameRateArray = frameRate;
  if(frameRate.length > 0){
    frameRate = frameRate.reduce((total,current) => total + current)/frameRate.length;
  }else{
    frameRate=0;
  }
  display_element.empty();
  jsPsych.finishTrial(trial_data);
  }



}
return plugin;
})();
