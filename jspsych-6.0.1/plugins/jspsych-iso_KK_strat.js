/*

Red/Green Isoluminance Pretest plugin for jsPsych
*/

jsPsych.plugins["ISO"]=(function(){

var plugin = {};

plugin.trial=function(display_element,trial) {


  trial=jsPsych.pluginAPI.evaluateFunctionParameters(trial);
  trial.choices = trial.choices || [];
  trial.dot_radius=trial.dot_radius || 100;
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

//variables from the matlab code
  var step = .02; //step size to vary color matches
  var initRed = .58;
  var initGreen = .55;
  var ticks = 2;
  var cycles = 16;
  var trials = 20;
  var ifi = 16.7 //hardcoded interframe interval for 60 fps in ms
  var redFactor=initRed;
  var greenFactor=initGreen;

  var colorStr="red";
  var redVal = 255*redFactor;
  var greenVal=255*greenFactor;
  var dotColor='rgb(' + redVal + ',0,0)';
  var color={
    redVal: redVal,
    greenVal: greenVal
  };




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
        x: apertureWidth/2, //x coordinate
        y: apertureHeight/2, //y coordinate
      };
      //randomly set the x and y coordinates


var stopDotMotion = false;
var firstFrame = true;
var timerHasStarted = false;
var timeoutID;
var Shrink=true;
var response = {
  rt: -1,
  key: -1
}

animateDotFlicker();


function startKeyboardListener(){
  if(trial.choices != jsPsych.NO_KEYS){
    keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_response,
      valid_responses:  trial.choices,
      rt_method: 'performance',
      persist: true,
      allow_held_key: false
    });
  }
}


function after_response(info) {
  window.clearTimeout(timeoutID);
  if (response.key == -1){
    response=info;
  }
  if (response.key==37){
    if (redFactor > 1 || redFactor<.4){
      redFactor=initRed
    }else{
    redFactor=redFactor-step
    if (step>0.005){
      step=step*.8;
    } else {
      step=.02;
    }
  }
  }
  if (response.key==39){
    if (redFactor > 1 || redFactor<.4){
      redFactor=initRed;
    }else{
    redFactor=redFactor+step;
    if (step>0.005){
      step=step*.8;
    } else {
      step=.02;
    }
  }
  }
  color=updateColor(redFactor,greenFactor)
}




  function draw() {
    ctx.clearRect(0,0,width,height);
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);



    ctx.fillStyle=dotColor;
    ctx.fill();



  }

  function initializeApertureParameters() {
    horizontalAxis=apertureWidth/2;
    verticalAxis=apertureHeight/2;
  }


function updateColor(redFactor,greenFactor){
  greenVal=255*greenFactor
  redVal=255*redFactor
  return {greenVal:greenVal, redVal:redVal}
}





  function updateDot() {

    //requestAnimationFrame(updateDot)
    if (colorStr=="red"){
      dotColor='rgb(0,' + color.greenVal + ',0)';
      colorStr="green";
    } else if(colorStr=="green"){
      dotColor='rgb(' + color.redVal + ',0,0)';
      colorStr="red";
    }

     return dotColor;
  }



  function animateDotFlicker() {
    var frameRequestID = window.requestAnimationFrame(animate);
    var previousTimeStamp
    var startime=performance.now()
    function animate() {
      if (stopDotMotion) {
        window.cancelAnimationFrame(frameRequestID);
      }
      else {
        frameRequestID = window.requestAnimationFrame(animate);
        if(firstFrame){
          startKeyboardListener();
          previousTimeStamp = performance.now();
          firstFrame = false;
        }
        else{
          if( (!timerHasStarted) && (trial.trial_duration > 0)){
            timeoutID=window.setTimeout(end_trial,trial.trial_duration);
            timerHasStarted = true;
          }
          var timestamp=performance.now()
          var runtime = timestamp-startime
          if (runtime>(ticks*ifi-.5*ifi)){
        //  if (runtime>1000){
            requestAnimationFrame(updateDot)
            startime=performance.now()
          }
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
  if (typeof keyboardListener !== 'undefined') {
    jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
  }
  display_element.empty();
  jsPsych.finishTrial(trial_data);
  }




}
return plugin;
})();
