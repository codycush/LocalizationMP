/*

Luminance Threshold plugin for jsPsych
*/

jsPsych.plugins["LTH"]=(function(){

var plugin = {};

plugin.info = {
  name: "ISO",
  description: '',
  parameters: {
    choices:{
      type: jsPsych.plugins.parameterType.FLOAT,
      pretty_name: "Key Choices",
      default: jsPsych.ALL_KEYS,
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
    default: true,
    description:''
  },
  background_color:{
    type:jsPsych.plugins.parameterType.STRING,
    pretty_name: "Background Color",
    default: "rgb(127,127,127)",
    description:''
  },
  fixation_cross_width:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: "Fixation Cross Width",
    default: 20,
    description:''
  },
  fixation_cross_height:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: "Fixation cross Height",
    default: 20,
    description: ''
  },
  fixation_cross_color:{
    type:jsPsych.plugins.parameterType.STRING,
    pretty_name: "Fixation Cross Color",
    default: "black",
    description:''
  },
  fixation_cross_thickness:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: "fixation cross thickness",
    default: 1,
    description:''
  },
  trial_type:{
    type:jsPsych.plugins.parameterType.STRING,
    pretty_name: 'trial type',
    default: "1",
    description: '1 - left, 2 - right, 3 - down,  4 -up'
  },
  trial_duration:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: 'trial duration',
    default:2000,
    description:''

  },
}

}
plugin.trial=function(display_element,trial) {


  var dotRadius=trial.dot_radius;
  var apertureWidth = trial.aperture_width;
  var apertureHeight = trial.aperture_height;
//  var apertureWidth=200
  //var apertureHeight=200
  var apertureCenterX=trial.aperture_center_x;
  var apertureCenterY=trial.aperture_center_y;
  var backgroundColor = trial.background_color;

  //fix cross stuff
  var fixationCross=trial.fixation_cross;
  var fixationCrossWidth = trial.fixation_cross_width;
  var fixationCrossHeight = trial.fixation_cross_height;
  var fixationCrossColor = trial.fixation_cross_color;
  var fixationCrossThickness = trial.fixation_cross_thickness;
  var bgVal=127; //make sure this equals the true/default RGB value (bg should never be changed from default)
  var lthVal=bgVal*.9;
  var step=bgval*.04;
  var centerOffset = apertureHeight/4; //how far to offset target circles from screen center
//  var trialType=trial.trial_type;
  var trialType=parseInt(trial.trial_type);
  var trialDur=trial.trial_duration;
//variables from the matlab code

  var trials = 30;
  var ifi = 16.7 //hardcoded interframe interval for 60 fps in ms, hardcoded ensures constant flicker on all refresh rates
  var timerHasStarted=false;
  var correct=0;//default to wrong, if timeout, presumably subject didn't see the stimulus

  var dotColor='rgb(' + lthVal + ',' + lthVal + ','+ lthVal + ')';


  var frameRate=[];


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
var ticks=30;

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
drawFix();


function startKeyboardListener(){
  if(trial.choices != jsPsych.NO_KEYS){
    keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_response,
      valid_responses:  trial.choices,
      rt_method: 'performance',
      persist: false,
      allow_held_key: false
    });
  }
}


function after_response(info) {
  window.clearTimeout(timeoutID);
  if (response.key == -1){
    response=info;
  }

  if (info.key==37){
    if (trialType==1){
      correct=1;
    } else if (trialType !== 1){
      correct=0;
    }
  }
  if (info.key==39){
    if (trialType==2){
      correct=1;
    } else if (trialType !== 2) {
      correct=0;
    }
  }
  if (info.key==38){
    if (trialType==4){
      correct=1;

    } else if (trialType !==3){
      correct=0;
    }

  }
  if (info.key==40){
    if (trialType==3){
      correct=1;
    } else if (trialType !==4){
      correct=0;
    }
  }


//  updateDot();
}

function drawFix() {
  //horizontal
  ctx.beginPath();
  ctx.lineWidth=fixationCrossThickness;
  ctx.moveTo(width/2 - fixationCrossWidth, height/2);
  ctx.lineTo(width/2 + fixationCrossWidth, height/2);
  ctx.fillStyle = fixationCrossColor;
  ctx.stroke();
  ctx.closePath();
  //vertical
  ctx.beginPath();
  ctx.lineWidth = fixationCrossThickness;
  ctx.moveTo(width/2,height/2 - fixationCrossHeight)
  ctx.lineTo(width/2,height/2 + fixationCrossHeight)
  ctx.fillStyle = fixationCrossColor;
  ctx.stroke();
  ctx.closePath();
}

  function draw() {
    ctx.clearRect(0,0,width,height);
   ctx.beginPath
   switch (trialType){
     case 1: //left
      ctx.arc(dot.x-centerOffset,dot.y,dotRadius,0,Math.PI*2);
      break;
     case 2: // right
        ctx.arc(dot.x+centerOffset,dot.y,dotRadius,0,Math.PI*2);
          break;
     case 3: //up
        ctx.arc(dot.x,dot.y+centerOffset,dotRadius,0,Math.PI*2);
        break;
     case 4: //down
        ctx.arc(dot.x,dot.y-centerOffset,dotRadius,0,Math.PI*2);
        break;

   }

//ctx.lineWidth=10;
ctx.fillStyle='rgb('+lthVal+','+lthVal+','+lthVal+')';
  //  ctx.strokeStyle=dotColor;
ctx.fill();
ctx.closePath();
//ctx.stroke();

    if (fixationCross == true){
      //horizontal
      drawFix();
    }



  }

  function initializeApertureParameters() {
    horizontalAxis=apertureWidth/2;
    verticalAxis=apertureHeight/2;
  }

function removeStim(){
  ctx.clearRect(0,0,apertureWidth,apertureHeight);
  drawFix();
}



function trialTimer() {
  var trialStart=performance.now()
  time();
  function time(trialStart){
    var trialCurr=performance.now()
    console.log(trialCurr)
    var trialCum=trialCurr-trialStart;
    if (trialCum>trialDur){
      console.log(trialCum)
      end_trial();

    }
  }
}





  function animateDotFlicker() {
    var frameRequestID = window.requestAnimationFrame(animate);
    var previousTimeStamp
    var startime=performance.now()
    function animate() {


        frameRequestID = window.requestAnimationFrame(animate);
        if(firstFrame){
          previousTimeStamp = performance.now();
          firstFrame = false;
        }
        else{

          if( (!timerHasStarted) && (trial.trial_duration > 0)){
            timeoutID=window.setTimeout(end_trial,trialDur);
            timerHasStarted = true;
          }
          var timestamp=performance.now()
          var runtime = timestamp-startime
          if (runtime>(ticks*ifi-.5*ifi)){
        //  if (runtime>1000){
          //  display_element.innerHTML='';
              window.requestAnimationFrame(removeStim)


          }
          draw();
          var currentTimeStamp = performance.now();
      //    frameRate.push(currentTimeStamp-previousTimeStamp);
          previousTimestamp = currentTimeStamp;
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
  //variables to save each trial
    "lthVal": lthVal,
    "correct": correct,

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
