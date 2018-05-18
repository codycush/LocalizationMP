/*
Main task for MPMask project
cody cushing 2/18/18
*/
jsPsych.plugins["mp-mask-staircase"]=(function(){
var plugin = {};

plugin.info = {
  name: 'mp-mask-staircase',
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
    default: "rgb(255,255,255)",
    description:''
  },
  lth_val:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: 'lth value',
    default: 120,
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
    //default:10000,
    description:''

  },
  staircase_type:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: 'staircase combo type',
    default: 1,
    description:'',
  },
  magno_noise:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: 'magno percent change',
    default: .4,
    description:'',
  },
  parvo_noise:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: 'parvo percent change',
    default: .4,
    description:'',

  },
  /*noise:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: 'stimulus noise level',
    default: .5,
    description:'',
  },*/
  m_consecutive_correct:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: "consecutive_correct trial counter",
    default: 0,
    description:'',
  },
  p_consecutive_correct:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: "consecutive_correct trial counter",
    default: 0,
    description:'',
  },
  m_consecutive_incorrect:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: 'consecutively incorrect trials',
    default: 0,
    description:'',
  },
  p_consecutive_incorrect:{
    type:jsPsych.plugins.parameterType.FLOAT,
    pretty_name: 'consecutively incorrect trials',
    default: 0,
    description:'',
  },
}//parameters
}//info
plugin.trial=function(display_element,trial){
  //var dotRadius=trial.dot_radius;
  var dotRadius=Math.round(2/deg_per_px); //2 degree stimulus
  //var apertureWidth = trial.aperture_width;
  //var apertureHeight = trial.aperture_height
var apertureWidth=Math.round(20/deg_per_px);//20 degrees x 20 degrees aperture
var apertureHeight=Math.round(20/deg_per_px);
//var apertureWidth=window.innerWidth;
//var apertureHeight=window.innerHeight;

  var apertureCenterX=trial.aperture_center_x;
  var apertureCenterY=trial.aperture_center_y;
  var backgroundColor = trial.background_color;
  //var lthVal=trial.lth_val/1.05; //'for no stiarcase'
  //var lthVal=trial.lth_val;

//var centerOffset=100
  var centerOffset= 5/deg_per_px; //five degrees of visual angle
  var staircaseType=trial.staircase_type;
  if(staircaseType==1||staircaseType==2){
    var lthVal=lthVal2;
    var mNoisePercent=noiseLevel2;
  }else if (staircaseType==3 || staircaseType==4){
    var lthVal=lthVal3;
    var mNoisePercent=noiseLevel3;
  }
  console.log(lthVal);

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

  //var magnoChange = trial.magno_change;
//  var parvoChange= trial.parvo_change;
  if (staircaseType==1 || staircaseType==4){
    var pNoisePercent=noiseLevel2;
  }else if (staircaseType==2 || staircaseType==3){
    var pNoisePercent=noiseLevel3;
  }
  //var mNoisePercent=trial.magno_noise;
  //var pNoisePercent=trial.parvo_noise;
  //var noisePercent=trial.noise;

  var mConsecutiveCorrect=trial.m_consecutive_correct;
  var mConsecutiveIncorrect=trial.m_consecutive_incorrect;

  var pConsecutiveCorrect=trial.p_consecutive_correct;
  var pConsecutiveIncorrect=trial.p_consecutive_incorrect;

  var mBackColor='rgb(127,127,127)'

  var ifi = 16.7 //hardcoded interframe interval for 60 fps in ms to ensure same stim dur across systems
  var ticks=2; //frames to show stim for

  var gratingAngles=[1,2]; //too lazy to change variable name from discrimination exp, angle 1=left target 2=right target
  var spatFrequency=20; //spatial freq of grating
  var firstDraw=true; //first round of  drawing
  var firstBack=true;
  //var percentChange=.5;

  if (trialType==2|trialType==4){
    var lthDiff=127-lthVal;
    lthVal=127+lthDiff;
  }
  if (trialType<3){
    var stimOrder=1;
    var currColor ={
      color1: "rgb("+Math.round(redVal)+",0,0)",
      color2: "rgb(0,"+Math.round(greenVal)+",0)",

    }
  }else{
    stimOrder=2
    var currColor ={
      color1: "rgb(0,"+Math.round(greenVal)+",0)",
      color2: "rgb("+Math.round(redVal)+",0,0)",

    }
    }
  var stimType;

  var canvas = document.createElement("canvas");
  display_element.append(canvas);

  var body = document.getElementsByClassName("jspsych-display-element")[0];
  body.style.margin = 0;
  body.style.padding = 0;
  document.body.style.backgroundColor = backgroundColor;
  console.log(window.outerHeight)

  canvas.style.margin = 0;
  canvas.style.padding = 0;
  var body2 = document.getElementsByClassName("jspsych-content")[0];
  body2.maxWidth='100%';


  var ctx = canvas.getContext("2d");

  var width = canvas.width = apertureWidth;
  var height = canvas.height = apertureHeight;
//var width=canvas.width=window.innerWidth;
//var height=canvas.height=window.innerHeight;
//  canvas.style.backgroundcolor = backgroundColor;

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
var image;
var firstStimOff;
var secondStimOff;
var stimOff;
var isiOver=false;
var frameRequestID;

//startSequence();
//drawFix();
startSequence();
//drawFix();
//window.setTimeout(stimPresent,500)





var initialization;
function startSequence(){
  drawBack();
  drawFix();
  initialization=performance.now()
  countdownID=window.setInterval(countdown,ifi);
}

function countdown(){
  var preTime=performance.now()
  if ((preTime-initialization)>500){
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

function drawBack() {
  if ((stimOrder==1 & firstDraw==true)||(stimOrder==2 &firstDraw==false&firstBack==false)||(stimOrder==1 & firstBack==true)){
  ctx.clearRect(0,0,width,height)
  ctx.fillStyle=mBackColor
  document.body.style.backgroundColor = mBackColor;

  ctx.fillRect(0,0,canvas.width,canvas.height)
} else if ((stimOrder==2 & firstDraw==true)||(stimOrder==1&firstDraw==false&firstBack==false)||(stimOrder==2 &firstBack==true)){
  ctx.clearRect(0,0,width,height)
  ctx.fillStyle=currColor.color1;
  document.body.style.backgroundColor = currColor.color1;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  }
  //jsPsych.pauseExperiment();
}

function drawM(gratingAngle){

ctx.beginPath();
switch (gratingAngle){
  case 1: //left
   ctx.arc(dot.x-centerOffset,dot.y,dotRadius,0,Math.PI*2);
     console.log('selected case 1')
   break;
  case 2: // right
     ctx.arc(dot.x+centerOffset,dot.y,dotRadius,0,Math.PI*2);
       break;
  /* sticking with 2AFC but in case that ever changes
  case 3: //up
     ctx.arc(dot.x,dot.y+centerOffset,dotRadius,0,Math.PI*2);
     break;
  case 4: //down
     ctx.arc(dot.x,dot.y-centerOffset,dotRadius,0,Math.PI*2);
     break;*/
}
     ctx.fillStyle='rgb('+lthVal+','+lthVal+','+lthVal+')';
       //  ctx.strokeStyle=dotColor;
     ctx.fill();
     ctx.closePath();//image=ctx.getImageData(apertureWidth/2-dotRadius,apertureHeight/2-dotRadius,dotRadius,dotRadius)//pull pixels for square with radius of view circle


}//


function drawP(gratingAngle){

//ctx.strokeStyle="rgb(0,"+Math.round(greenVal)+",0)";
//ctx.rotate(Math.PI/4)
ctx.beginPath()
switch (gratingAngle){
  case 1: //left
   ctx.arc(dot.x-centerOffset,dot.y,dotRadius,0,Math.PI*2);
   break;
  case 2: // right
     ctx.arc(dot.x+centerOffset,dot.y,dotRadius,0,Math.PI*2);
       break;
  /* sticking with 2AFC but in case that ever changes
  case 3: //up
     ctx.arc(dot.x,dot.y+centerOffset,dotRadius,0,Math.PI*2);
     break;
  case 4: //down
     ctx.arc(dot.x,dot.y-centerOffset,dotRadius,0,Math.PI*2);
     break;*/
}
     ctx.fillStyle=currColor.color2;
       //  ctx.strokeStyle=dotColor;
     ctx.fill();
     ctx.closePath();//image=ctx.getImageData(apertureWidth/2-dotRadius,apertureHeight/2-dotRadius,dotRadius,dotRadius)//pull pixels for square with radius of view circle



}//
//bit of code to find x,y coords within viewing area we wish to swap pixs on
var squareX=[]
var squareY=[];

for (x=0; x<apertureWidth; x++){
  for (y=0;y<apertureHeight;y++){

      squareX.push(x)
      squareY.push(y)


    }

  }
  //console.log(circleX.length,circleY.length)
//




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
        if(firstDraw){//stimorder 1 =M-P, 2=P-
            if( (!timerHasStarted) && (trial.trial_duration > 0)){
              timeoutID=window.setTimeout(end_trial,trialDur);
              timerHasStarted = true;
            }
            var timestamp=performance.now()
            var runtime = timestamp-startime
            if (runtime>0){
                  //removeStim();
                if (stimOrder==1){
                  drawM(anglePair.firstAngle)
                  stimType="M";
                }else{
                  drawP(anglePair.firstAngle)
                  stimType="P";
                }

                stimOff=performance.now()
                firstStimOff=stimOff-startime;
                removeStim();
                window.cancelAnimationFrame(frameRequestID)
                firstDraw=false;
                runtime=[]
           }
            var currentTimeStamp = performance.now();
        //    frameRate.push(currentTimeStamp-previousTimeStamp);
            previousTimestamp = currentTimeStamp
        } else if (firstDraw==false && stimDone==false){

            var timestamp=performance.now()
            var runtime=timestamp-startime
              //if (isi_runtime>isiDur){
              if (runtime>(isiDur/2)){//swap background halfway through isidur
                firstBack=false;
                drawBack();
                drawFix();
              }
                if(runtime>(isiDur)){
                if (stimOrder==1){
                  drawP(anglePair.secondAngle)
                  stimType="P";
                }else{
                  drawM(anglePair.secondAngle)
                  stimType="M";
                }
              }

            if ((runtime-isiDur)>0){
                window.cancelAnimationFrame(frameRequestID)
                removeStim();
              //  console.log("seconddraw done")
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


function shuffle(a) {
    var j, x, i;
    var newArray
    newArray=a;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        newArray[i] = a[j];
        newArray[j] = x;

}
return newArray
}//shuffle


function getColorIndicesForCoord(x, y, width) {
  var red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
}

Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.includes(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr;
}

function createMask(){
  var coordIdx=[]

  var maskImg=ctx.getImageData(0,0,apertureWidth,apertureHeight)//pull pixels for square with radius of view circle
  for (z=0;z<squareX.length;z++){
    coordIdx.push(z)
  }
  console.log(coordIdx.length)
  var shuffCoord=shuffle(coordIdx)
  if (stimType=="M"){
    var coordPicks=shuffCoord.slice(0,(mNoisePercent*shuffCoord.length))
    console.log(mNoisePercent)
  } else if (stimType=="P"){
    var coordPicks=shuffCoord.slice(0,(pNoisePercent*shuffCoord.length))
    console.log(pNoisePercent)
  }
  //var coordPicks=shuffCoord.slice(0,(noisePercent*shuffCoord.length))

  var values=[];
  for (x=0;x<coordPicks.length;x++){
    //  for (y=0;y<coordPicks.length;y++){
    var idx=coordPicks[x]
    var xcoord=squareX[idx]
    var ycoord=squareY[idx]
    var colorIndices = getColorIndicesForCoord(xcoord, ycoord, apertureWidth);
    var redIndex = colorIndices[0];
    var greenIndex = colorIndices[1];
    var blueIndex = colorIndices[2];
    var alphaIndex = colorIndices[3];
    var redForCoord = maskImg.data[redIndex];
    var greenForCoord = maskImg.data[greenIndex];
    var blueForCoord = maskImg.data[blueIndex];
    var alphaForCoord = maskImg.data[alphaIndex];
    var colorTrio=[redForCoord,greenForCoord,blueForCoord]
    var coinFlip=randomNumberBetween(1,2);
    if (coinFlip==2){
      if (redForCoord==Math.round(redVal)){
        maskImg.data[redIndex]=0;
        maskImg.data[greenIndex]=Math.round(greenVal);
        maskImg.data[blueIndex]=0;
      }  else if (greenForCoord==Math.round(greenVal)){
        maskImg.data[redIndex]=Math.round(redVal);
        maskImg.data[greenIndex]=0;
        maskImg.data[blueIndex]=0;
      }
      /*if(redForCoord==0 && greenForCoord==0 && blueForCoord==0){
      var flip=randomNumberBetween(1,2)
      if (flip==1){
      maskImg.data[redIndex]=redVal;
      maskImg.data[greenIndex]=0;
      maskImg.data[blueIndex]=0
    }else{
    maskImg.data[redIndex]=0;
    maskImg.data[greenIndex]=greenVal;
    maskImg.data[blueIndex]=0;
  }
}*/



if (blueForCoord==Math.round(lthVal)){
  if (stimType=="M"){
    maskImg.data[redIndex]=127;
    maskImg.data[greenIndex]=127;
    maskImg.data[blueIndex]=127;
  }else{
    var flip=randomNumberBetween(1,2)
    if (flip==1){
      maskImg.data[redIndex]=redVal;
      maskImg.data[greenIndex]=0;
      maskImg.data[blueIndex]=0
    }else{
      maskImg.data[redIndex]=0;
      maskImg.data[greenIndex]=greenVal;
      maskImg.data[blueIndex]=0;
    }

  }
}else if (blueForCoord==127){
  if (stimType=="M"){
    maskImg.data[redIndex]=lthVal;
    maskImg.data[greenIndex]=lthVal;
    maskImg.data[blueIndex]=lthVal;
  }else{
    var flip=randomNumberBetween(1,2)
    if (flip==1){
      maskImg.data[redIndex]=redVal;
      maskImg.data[greenIndex]=0;
      maskImg.data[blueIndex]=0
    }else{
      maskImg.data[redIndex]=0;
      maskImg.data[greenIndex]=greenVal;
      maskImg.data[blueIndex]=0;
      }

  }
}


//Controlling for edges (which tend to be rendered with shaded color values and thus not picked up in the swap)
if(stimType=="P" && maskImg.data[redIndex]!=Math.round(redVal) && maskImg.data[greenIndex]!=Math.round(greenVal)){
var flip=randomNumberBetween(1,2)
if (flip==1){
maskImg.data[redIndex]=redVal;
maskImg.data[greenIndex]=0;
maskImg.data[blueIndex]=0
}else{
maskImg.data[redIndex]=0;
maskImg.data[greenIndex]=greenVal;
maskImg.data[blueIndex]=0;
}
}

if(stimType=="M" && maskImg.data[blueIndex]!=Math.round(lthVal)&& maskImg.data[blueIndex]!=127 ){
var flip=randomNumberBetween(1,2)
if (flip==1){
maskImg.data[redIndex]=lthVal;
maskImg.data[greenIndex]=lthVal;
maskImg.data[blueIndex]=lthVal;
}else{
maskImg.data[redIndex]=127;
maskImg.data[greenIndex]=127;
maskImg.data[blueIndex]=127;
}
}
////////////////////////////////////////

} //if coinflip
//}//fory
}//forx
return maskImg
}//createmask





function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


var maskStart


function removeStim(){
  console.log('removing stim')
    mask=createMask();
//ctx.clearRect(0,0,apertureWidth,apertureHeight)


  maskStart=performance.now()
  window.requestAnimationFrame(showMask)
  function showMask(){
    console.log('showing mask')
    maskID=window.requestAnimationFrame(showMask)
    //ctx.fillRect(0,0,apertureWidth,apertureHeight)
    ctx.putImageData(mask,0,0)
    var maskDur=performance.now()
    if ((maskDur-maskStart)>(ticks*ifi-ifi*.5)){
  //  if((maskDur-maskStart)>1000){
      window.cancelAnimationFrame(maskID)

      ctx.clearRect(0,0,apertureWidth,apertureHeight);

      drawBack();
      drawFix();
  }
  }
  //window.requestAnimationFrame(checkerMask)

  if(stimDone==false){stimPresent()}

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
    "lthVal": lthVal,
    "magno_noise_level": mNoisePercent,
    "parvo_noise_level": pNoisePercent,
    "staircase_type": staircaseType,
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
