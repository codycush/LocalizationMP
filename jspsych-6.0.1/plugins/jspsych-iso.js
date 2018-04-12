/*

Red/Green Isoluminance Pretest plugin for jsPsych
by Cody Cushing 2/10/18
*/

jsPsych.plugins["ISO"]=(function(){

var plugin = {};

plugin.info = {
  name: "ISO",
  description: '',
  parameters: {
    choices:{
      type: jsPsych.plugins.parameterType.FLOAT,
      pretty_name: "Key Choices",
      default: undefined,
      description: ''
    },
    dot_radius:{
      type: jsPsych.plugins.parameterType.FLOAT,
      pretty_name: "Dot Radius",
      default: 100,
      description:''
    },
    dot_color:{
      type: jsPsych.plugins.parameterType.STRING,
      pretty_name: "Dot Color",
      default: "rgb(180,180,180)",
      description:''
  },
  aperture_width:{
    type: jsPsych.plugins.parameterType.FLOAT,
    pretty_name: "Aperture Width",
    default: window.innerWidth,
    description:''
  },
  aperture_height:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: "Aperture Height",
    default: window.innerHeight,
    description:''
  },
  aperture_center_x:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: "Aperture Center Xcoord",
    default: window.innerWidth/2,
    description:'',

  },
  aperture_center_y:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: "Aperture Center Ycoord",
    default: window.innerHeight/2,
    description:''
  },
  fixation_cross:{
    type:jsPsych.plugins.parameterType.BOOL,
    pretty_name: "Fixation Cross",
    default: false,
    description:''
  },
  background_color:{
    type:jsPsych.plugins.parameterType.STRING,
    pretty_name: "Background Color",
    default: "rgb(127,127,127)",
    description:''
  }

}
}
plugin.trial=function(display_element,trial) {


  var dotRadius=trial.dot_radius;
  var apertureWidth = trial.aperture_width;
  var apertureHeight = trial.aperture_height
//  var apertureWidth=200
  //var apertureHeight=200
  var apertureCenterX=trial.aperture_center_x;
  var apertureCenterY=trial.aperture_center_y;
  var backgroundColor = trial.background_color;
  var moveDistance = trial.move_distance;

//variables from the matlab code
  var step = .02; //step size to vary color matches
//var initRed = .58
  var initRed=randomNumberBetween(.04,1);
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

  var width = canvas.width = apertureWidth;
  var height = canvas.height = apertureHeight;

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
//var Shrink=true;
var response = {
  rt: -1,
  key: -1
}

animateDotFlicker();
startKeyboardListener();

function randomNumberBetween(lowerBound, upperBound) {
  return lowerBound + Math.random() * (upperBound - lowerBound);
}

function startKeyboardListener(){
  if(trial.choices != jsPsych.NO_KEYS){
    keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_response,
      valid_responses:  trial.choices,
      rt_method: 'performance',
      persist: true,
      allow_held_key: true,
    });
  }
}


function after_response(info) {
  window.clearTimeout(timeoutID);
  if (response.key == -1){
    response=info;
  }

  if (info.key==37){
    if (redFactor > 1 || redFactor<.04){
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
  if (info.key==39){
    if (redFactor > 1 || redFactor<.04){
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
  if (info.key==32){
    end_trial();
  }
  color=updateColor(redFactor,greenFactor)
}



  function draw() {
    ctx.clearRect(0,0,width,height);
   ctx.beginPath();
    ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI*2);

//ctx.lineWidth=10;
ctx.fillStyle=dotColor;
  //  ctx.strokeStyle=dotColor;
ctx.fill();
//ctx.stroke();


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
      dotColor='rgb(0,' + Math.round(color.greenVal) + ',0)';
      colorStr="green";
    } else if(colorStr=="green"){
      dotColor='rgb(' + Math.round(color.redVal) + ',0,0)';
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
          previousTimeStamp = performance.now();
          firstFrame = false;
        }
        else{
          /*
          if( (!timerHasStarted) && (trial.trial_duration > 0)){
            timeoutID=window.setTimeout(end_trial,trial.trial_duration);
            timerHasStarted = true;
          }*/
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
  var trial_data= {
    "greenVal":color.greenVal,
    "redVal": color.redVal
  }

  if (typeof keyboardListener !== 'undefined') {
    jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
  }
  display_element.innerHTML='';
  jsPsych.finishTrial(trial_data);
  }




}
return plugin;
})();
