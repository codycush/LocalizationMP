/*
blank fixation screen
by cody cushing
*/

jsPsych.plugins["fixation"]=function(){
  var plugin={};
  plugin.info = {
    name: 'fixation',
    description: '',
    parameters: {
      aperture_width:{
        type: jsPsych.plugins.parameterType.FLOAT,
        pretty_name: "Aperture Width",
        default: 600,
        description:''
      },
      aperture_height:{
        type:jsPsych.plugins.parameterType.FLOAT,
        pretty_name: "Aperture Height",
        default: 600,
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
      trial_duration:{
        type:jsPsych.plugins.parameterType.FLOAT,
        pretty_name: 'trial duration',
        default:2000,
        description:''

      },
    }//parameters
  }//plugin.info
plugin.trial=function(display_element,trial){
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
  var trialDur=trial.trial_duration;
  var canvas = document.createElement("canvas");
  display_element.append(canvas);

  var body = document.getElementsByClassName("jspsych-display-element")[0];
  body.style.margin = 0;
  body.style.padding = 0;
  body.style.backgroundColor = backgroundColor;

  //canvas.style.margin = 0;
  //canvas.style.padding = 0;

  var ctx = canvas.getContext("2d");

  var width = canvas.width = apertureWidth;
  var height = canvas.height = apertureHeight;

  canvas.style.backgroundcolor = backgroundColor;

  var horizontalAxis;
  var verticalAxis;

  initializeApertureParameters();
  drawFix();
  window.setTimeout(end_trial,trialDur)
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
  function initializeApertureParameters() {
    horizontalAxis=apertureWidth/2;
    verticalAxis=apertureHeight/2;
  }
  function end_trial() {

    var trial_data= {
    //variables to save each trial

    }


    display_element.innerHTML='';
    jsPsych.finishTrial(trial_data);
    }


}


  return plugin;
}();
