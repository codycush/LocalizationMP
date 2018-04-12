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
    default: 200,
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
    default:2068,
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
  var currColor ={
    color1: '',
    color2: '',

  }

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
//drawFix();
//window.setTimeout(stimPresent,500)





var initialization;
function startSequence(){
  drawFix();
  //requestAnimationFrame(countdown)
  initialization=performance.now()
  countdownID=window.setInterval(countdown,ifi);
  //window.setTimeout(startStim,500)
}

function countdown(){
  //requestAnimationFrame(countdown)
  var preTime=performance.now()
  console.log("counting down")
//  console.log(preTime-initialization)
//  console.log(preTime-initialization)
  if ((preTime-initialization)>500){
    console.log("countdown done")
    window.clearInterval(countdownID)
    stimPresent();
    }
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
    currColor.color1=ctx.strokeStyle;
    currColor.color2=backgroundColor;
    ctx.moveTo(5+i*(spatFrequency*2),0);
    ctx.lineTo(5+i*(spatFrequency*2),apertureHeight);
    ctx.stroke();

    //ctx.arc(apertureWidth/2,apertureHeight/2,25,0,Math.PI*2);
    //ctx.fill();
}
ctx.restore();

}//
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
currColor.color1="rgb("+redVal+",0,0)";
currColor.color2="rgb(0,"+greenVal+",0)";
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


ctx.restore
image=ctx.getImageData(apertureWidth/2+dotRadius,apertureHeight/2+dotRadius,dotRadius,dotRadius)//pull pixels for square with radius of view circles

}//
var circleX=[]
var circleY=[]
for (x=0; x<(dotRadius*2); x++){
  for (y=0;y<(dotRadius*2);y++){
    var dx=x-dotRadius;
    var dy=y-dotRadius;
    var distanceSquared=dx*dx+dy*dy;
    if (distanceSquared <= (dotRadius^2)){
      circleX.push(x)
      circleY.push(y)

    }
    }

  }

console.log(circleX,circleY)

var firstStimOff;
var secondStimOff;
var stimOff;
var isiOver=false;
var frameRequestID;
function stimPresent(){
  var previousTimeStamp;
  var startime=performance.now();
  window.requestAnimationFrame(stimShow);

  function stimShow(){
    //frameRequestID=window.requestAnimationFrame(stimShow);
    frameRequestID=window.requestAnimationFrame(stimShow)

    if (firstFrame){
      previousTimeStamp=performance.now();
      firstFrame=false;
      anglePair=pick2Angles();
        }
        else{



          if (firstDraw){//stimorder 1 =M-P, 2=P-
            console.log("starting first draw")
            if( (!timerHasStarted) && (trial.trial_duration > 0)){
              timeoutID=window.setTimeout(end_trial,trialDur);
              timerHasStarted = true;
            }
            var timestamp=performance.now()
            var runtime = timestamp-startime
            if (runtime>(ticks*ifi-.5*ifi)){
                  //removeStim();
                window.cancelAnimationFrame(frameRequestID)
                stimOff=performance.now()
                firstStimOff=stimOff-startime;
                removeStim();
                //window.requestAnimationFrame(removeStim)
              //  window.cancelAnimationFrame(frameRequestID)

                  firstDraw=false;
                  console.log("firstdraw done")
                  runtime=[]
            }
            if (stimOrder==1){drawM(anglePair.firstAngle)}else{drawP(anglePair.firstAngle)}
            var currentTimeStamp = performance.now();
        //    frameRate.push(currentTimeStamp-previousTimeStamp);
            previousTimestamp = currentTimeStamp
        }  else if (firstDraw==false && stimDone==false){

            //var isi_timestamp=performance.now()
          // var isi_runtime=isi_timestamp-startime
            /*
            if (isi_runtime>1000){
              isiOver=true;//interstim interval over
            } */
            var timestamp=performance.now()
            var runtime=timestamp-startime
              //if (isi_runtime>isiDur){
                if(runtime>(isiDur)){
                if (stimOrder==1){drawP(anglePair.secondAngle)}else{drawM(anglePair.secondAngle)}
              }

            //  var timestamp2=performance.now()
              //var runtime2=timestamp2-startime+isi_time

              if ((runtime-isiDur)>(ticks*ifi-.5*ifi)){
                window.cancelAnimationFrame(frameRequestID)
                removeStim()
                console.log("seconddraw done")
                //window.cancelAnimationFrame(frameRequestID)
                stimOff=performance.now()
                secondStimOff=stimOff-startime-isiDur;
                stimDone=true;
                fixationCrossColor="blue";

              }

        }
      }//else
      //return firstStimOff
  }
  // if (stimDone){return}
}//stimPresent

var maskStart
function removeStim(){


  maskStart=performance.now()

  window.requestAnimationFrame(checkerMask)

  if(stimDone==false){stimPresent()}

}

function checkerMask() {
  maskID=window.requestAnimationFrame(checkerMask)
    var w = width;
    var h = height;

  var   nRow =  spatFrequency;    // default number of rows
    var nCol = spatFrequency;    // default number of columns

    w /= nCol;            // width of a block
    h /= nRow;

    ctx.save();
    ctx.fillStyle=backgroundColor;
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.beginPath();
    ctx.arc(apertureWidth/2,apertureHeight/2,dotRadius,0,Math.PI*2)
    ctx.strokeStyle=backgroundColor;
    ctx.stroke();
    ctx.closePath();
    ctx.clip();









              // height of a block
    ctx.fillStyle=currColor.color1
    for (var i = 0; i < nRow; ++i) {
        for (var j = 0, col = nCol / 2; j < col; ++j) {
            ctx.fillRect(2 * j * w + (i % 2 ? 0 : w), i * h, w, h);
        }
    }
    //ctx.fill()
    ctx.fillStyle=currColor.color2
  //  ctx.translate(w,0)
    for (var i = 0; i < nRow; ++i) {
        for (var j = 0, col = nCol / 2; j < col; ++j) {
            ctx.fillRect((2 * j * w + (i % 2 ? 0 : w))+w, i * h, w, h);
        }
    }
    ctx.restore()
    var maskDur=performance.now()
    if ((maskDur-maskStart)>(ticks*ifi-ifi*.5)){
      window.cancelAnimationFrame(maskID)
      ctx.clearRect(0,0,apertureWidth,apertureHeight)

      drawFix();
    }
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
    "secondstimoff":secondStimOff,
    "Stimulus Order": stimOrder,
    "First Angle": anglePair.firstAngle,
    "Second Angle": anglePair.secondAngle,
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
