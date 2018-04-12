/*
Main task for MPMask project
cody cushing 2/18/18
*/
jsPsych.plugins["mp-mask"]=(function(){
var plugin = {};

plugin.info = {
  name: 'mp-mask',
  description:'',
  parameters:{
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
  },
  lth_val:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: 'lth value',
    default: 0,
    description: '',
  },
  red_val:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: 'red value',
    default: 180,
    description:'',
  },
  green_val:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: 'green value',
    default: 140.25,
    description:'',
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
    default:2034,
    description:''

  },
}//parameters
}//info
plugin.trial=function(display_element,trial){
  var dotRadius=trial.dot_radius;
  var apertureWidth = trial.aperture_width;
  var apertureHeight = trial.aperture_height
  var apertureCenterX=trial.aperture_center_x;
  var apertureCenterY=trial.aperture_center_y;
  var backgroundColor = trial.background_color;
  var lthVal=trial.lth_val/1.05;
  var redVal=trial.red_val;
  var greenVal=trial.green_val;
  var trialType=parseInt(trial.trial_type);
  var trialDur=trial.trial_duration;
  //fix cross stuff
  var fixationCross=trial.fixation_cross;
  var fixationCrossWidth = trial.fixation_cross_width;
  var fixationCrossHeight = trial.fixation_cross_height;
  var fixationCrossColor = trial.fixation_cross_color;
  var fixationCrossThickness = trial.fixation_cross_thickness;
  var ifi = 16.7 //hardcoded interframe interval for 60 fps in ms to ensure same stim dur across systems
  var ticks=2; //frames to show stim for

  var gratingAngles=[45,315];
  var spatFrequency=20; //spatial freq of grating
  var firstDraw=true; //first round of  drawing

  var stimOrder=trialType;

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

  var frameRate=[];

  var numberOfFrames = 0;


      var dot = {
        x: apertureWidth/2, //x coordinate
        y: apertureHeight/2, //y coordinate
      };
      //randomly set the x and y coordinates

var firstFrame = true;
var timerHasStarted = false;
var timeoutID;
var stimDone=false;//done drawing gratings
var isiDur=1000; //interstimulus interval
//var Shrink=true;
var response = {
  rt: -1,
  key: -1
}



//startSequence();
//drawFix();
startSequence();
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

function startSequence(){
  drawFix();
  requestAnimationFrame(countdown)
  var initialization=performance.now()
  function countdown(){
    requestAnimationFrame(countdown)
    var preTime=performance.now()
  //  console.log(preTime-initialization)
    if ((preTime-initialization)>500){
    stimPresent(stimOrder)//start with blank 500 ms
    initialization=[];
    preTime=[];
  }




  }

}


function after_response(info) {
//  window.clearTimeout(timeoutID);
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

function pick2Angles(){
      var angle1=gratingAngles[Math.floor(Math.random()*gratingAngles.length)]
      var angle2=gratingAngles[Math.floor(Math.random()*gratingAngles.length)]
return {
  firstAngle:angle1,
  secondAngle:angle2,
}

}

function drawFix() {
  //horizontal
  ctx.beginPath();
  ctx.lineWidth=fixationCrossThickness;
  ctx.moveTo(width/2 - fixationCrossWidth, height/2);
  ctx.lineTo(width/2 + fixationCrossWidth, height/2);
  ctx.strokeStyle = fixationCrossColor;
  ctx.stroke();
  ctx.closePath();
  //vertical
  ctx.beginPath();
  ctx.lineWidth = fixationCrossThickness;
  ctx.moveTo(width/2,height/2 - fixationCrossHeight)
  ctx.lineTo(width/2,height/2 + fixationCrossHeight)
  ctx.strokeStyle = fixationCrossColor;
  ctx.stroke();
  ctx.closePath();
  if(stimDone){return}
}
function drawM(gratingAngle){
  ctx.clearRect(0,0,width,height)
ctx.save();
ctx.fillStyle=backgroundColor;
ctx.fillRect(0,0,canvas.width,canvas.height)
ctx.beginPath();
ctx.arc(apertureWidth/2,apertureHeight/2,dotRadius,0,Math.PI*2)
ctx.strokeStyle=backgroundColor;
ctx.stroke();
ctx.closePath();
ctx.clip();
if (gratingAngle==45){ctx.translate(apertureWidth/2,0)}else if(gratingAngle==315){ctx.translate(0,apertureHeight/2)}
ctx.rotate(gratingAngle*Math.PI/180)
//ctx.rotate(Math.PI/4)
  for (i=0;i<20;i++){
    ctx.beginPath();

    ctx.lineWidth=spatFrequency;
    ctx.strokeStyle="rgb("+lthVal+","+lthVal+","+lthVal+")";
    ctx.moveTo(5+i*(spatFrequency*2),0);
    ctx.lineTo(5+i*(spatFrequency*2),apertureHeight);
    ctx.stroke();

    //ctx.arc(apertureWidth/2,apertureHeight/2,25,0,Math.PI*2);
    //ctx.fill();
}
ctx.restore();

}//drawM
function drawP(gratingAngle){
  ctx.clearRect(0,0,width,height)
ctx.save();
ctx.fillStyle=backgroundColor;
ctx.fillRect(0,0,canvas.width,canvas.height)
ctx.beginPath();
ctx.arc(apertureWidth/2,apertureHeight/2,dotRadius,0,Math.PI*2)
ctx.strokeStyle=backgroundColor;
ctx.stroke();
ctx.closePath();
ctx.clip();
if (gratingAngle==45){ctx.translate(apertureWidth/2,0)}else if(gratingAngle==315){ctx.translate(0,apertureHeight/2)}
ctx.rotate(gratingAngle*Math.PI/180)
//ctx.rotate(Math.PI/4)
  for (i=0;i<20;i++){
    ctx.beginPath();

    ctx.lineWidth=spatFrequency;
    ctx.strokeStyle="rgb("+redVal+",0,0)";
    ctx.moveTo(5+i*(spatFrequency*2),0);
    ctx.lineTo(5+i*(spatFrequency*2),apertureHeight);
    ctx.stroke();

    //ctx.arc(apertureWidth/2,apertureHeight/2,25,0,Math.PI*2);
    //ctx.fill();
}
for (i=0;i<20;i++){
  ctx.beginPath();

  ctx.lineWidth=spatFrequency;
  ctx.strokeStyle="rgb(0,"+greenVal+",0)";
  ctx.moveTo(spatFrequency+5+i*(spatFrequency*2),0);
  ctx.lineTo(spatFrequency+5+i*(spatFrequency*2),apertureHeight);
  ctx.stroke();

  //ctx.arc(apertureWidth/2,apertureHeight/2,25,0,Math.PI*2);
  //ctx.fill();
}


ctx.restore();

}//drawP

var firstStimOff;
var stimOff;
var isiOver=false;
function stimPresent(stimOrder){
  var previousTimeStamp;
  var startime=performance.now();
  var frameRequestID=window.requestAnimationFrame(stimShow);

  function stimShow(){
    frameRequestID=window.requestAnimationFrame(stimShow);
    if (firstFrame){
      previousTimeStamp=performance.now();
      firstFrame=false;
      anglePair=pick2Angles();
        }
        else{



          if (firstDraw){//stimorder 1 =M-P, 2=P-M
            if( (!timerHasStarted) && (trial.trial_duration > 0)){
              timeoutID=window.setTimeout(end_trial,trialDur);
              timerHasStarted = true;
            }
            var timestamp=performance.now()
            var runtime = timestamp-startime
            if (runtime>(ticks*ifi-.5*ifi)){
                  //removeStim();
                  window.requestAnimationFrame(removeStim)
                  stimOff=performance.now()
                  firstStimOff=stimOff-startime;
                  firstDraw=false;
                  runtime=[]
            }
            if (stimOrder==1){drawM(anglePair.firstAngle)}else{drawP(anglePair.firstAngle)}
            var currentTimeStamp = performance.now();
        //    frameRate.push(currentTimeStamp-previousTimeStamp);
            previousTimestamp = currentTimeStamp
        }  else {
          //  var isi_timestamp=performance.now()
            //var isi_runtime=isi_timestamp-startime
            /*
            if (isi_runtime>1000){
              isiOver=true;//interstim interval over
            } */
            //var timestamp=performance.now()
            //var runtime=timestamp-startime
              //if (isi_runtime>isiDur){
                if(runtime>(isiDur)){
                if (stimOrder==1){drawP(anglePair.secondAngle)}else{drawM(anglePair.secondAngle)}
              }
            //  var timestamp2=performance.now()
              //var runtime2=timestamp2-startime+isi_time
              /*
              if ((isi_runtime-isiDur)>(ticks*ifi-.5*ifi)){
                window.requestAnimationFrame(removeStim)
                stop=runtime;
                stimDone=true;
                fixationCrossColor="blue";

              }*/

        }
      }//else
      return firstStimOff
  }
  return firstStimOff
}//stimPresent
function removeStim(){
  ctx.clearRect(0,0,apertureWidth,apertureHeight)
drawFix();
}



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
    "firststimoff":firstStimOff,
  }

  if (typeof keyboardListener !== 'undefined') {
    jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
  }
  display_element.innerHTML='';
  jsPsych.finishTrial(trial_data);
  }


}//plugin.trial





  return plugin
})();
