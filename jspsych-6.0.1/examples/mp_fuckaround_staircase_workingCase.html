<! doctype html>
<html>
  <head>
  <title> Luminance Threshold</title>
  <script src = "../jspsych.js"></script>
  <script src = "../plugins/jspsych-LTH_alternate.js"></script> <!--Include the script for the plugin-->
  <script src = "../plugins/jspsych-html-keyboard-response.js"></script>
  <script src = "../plugins/jspsych-fullscreen.js"></script>
  <script src = "../plugins/jspsych-fixation.js"></script>
  <script src = "../plugins/jspsych-mp-mask-staircase.js"></script>
  <script src = "../pest.js"></script>
  <link href = "../css/jspsych.css" rel = "stylesheet"></link>
  </head>
  <body>
  </body>
  <script>
  var firstQ="During which interval did you feel more confident in your ability to see the image's orientation?"
  var secondQ="Which direction was the first image tilting?"
  var thirdQ="Which direction was the second image tilting?"
    var instructions_block = {
      type: "html-keyboard-response",
      stimulus: "<p>In this part of the experiment you will keep your eyes on fixation cross at the center of the screen.  Circles of varying brightness will appear to the left or right or at the top or bottom of the fixation cross.  Please indicate which direction a circle appeared with the appropriate arrow key (left, right, up, or down). Press enter to continue. </p>"
    }
    var fixation_block={
      type:'fixation',
      fixation_cross_color:"red",
      trial_duration:1000,
    }
var magno_change=1
var parvo_change=1

var mCorrect=false;
var pCorrect=false;
var m_consecutive_correct=0;
var m_consecutive_incorrect=0;
var p_consecutive_correct=0;
var p_consecutive_incorrect=0;

var noisePestParams_1u3d={
  starting_intensity: .5,
  down_threshold: 3,
  up_threshold: 1,
  upper_intensity_limit: 1,
  lower_intensity_limit: 0.0000000001,
  starting_step_size: 0.64,
  min_step_size: 0.01,
  max_step_size: 0.5,
}

var lthPestParams_1u3d={
  starting_intensity: 7,
  down_threshold: 3,
  up_threshold: 1,
  upper_intensity_limit: 20,
  lower_intensity_limit: 0.0000001,
  starting_step_size: 1,
  min_step_size: .001,
  max_step_size: 2,
}

var noisePestParams_1u2d={
  starting_intensity: .5,
  down_threshold: 2,
  up_threshold: 1,
  upper_intensity_limit: 1,
  lower_intensity_limit: 0.0000000001,
  starting_step_size: 0.64,
  min_step_size: 0.01,
  max_step_size: 0.5,
}

var lthPestParams_1u2d={
  starting_intensity: 7,
  down_threshold: 2,
  up_threshold: 1,
  upper_intensity_limit: 20,
  lower_intensity_limit: 0.0000001,
  starting_step_size: 1,
  min_step_size: .001,
  max_step_size: 2,
}




var pPest_1u3d=new pest(noisePestParams_1u3d)
var mPest_1u3d=new pest(lthPestParams_1u3d)
var pPest_1u2d=new pest(noisePestParams_1u2d)
var mPest_1u2d= new pest(lthPestParams_1u2d)

    var test_block = {
      type: "mp-mask-staircase",
      aperture_width: 600,
      aperture_height: 600,
      choices: jsPsych.ALL_KEYS,
      dot_radius: 150,
      lth_val: function(){return (127-mPest.staircase(mCorrect))},
      noise: function(){return (1-pPest.staircase(pCorrect))},

      trial_type:jsPsych.timelineVariable('trial_type'),
      on_finish: function(){

        //after every trial
      }
}
var response1={
  type:"html-keyboard-response",
  stimulus: [firstQ],
  choices: [49,50],
  prompt:"1-First Interval 2-Second Interval",
  response_ends_trial: true,


}
var response2={
     type:"html-keyboard-response",
     stimulus: [secondQ],
     choices: [37,39],
     prompt:"Left Arrow Key-Left Right Arrow Key-Right",
     response_ends_trial: true,
   }
   var response3={
     type:"html-keyboard-response",
     stimulus: [thirdQ],
     choices: [37,39],
     prompt:"Left Arrow Key-Left Right Arrow Key-Right",
     response_ends_trial: true,
     on_finish: function(){
       var last4trials=jsPsych.data.get().last(4)
       var stimTrial=last4trials.filter({trial_type:'mp-mask-staircase'})
       var firstResp=last4trials.filter({stimulus: firstQ})
       var secResp=last4trials.filter({stimulus: secondQ}).select('key_press').values
       var thirdResp=last4trials.filter({stimulus: thirdQ}).select('key_press').values
       var firstAngle=stimTrial.select('First Angle').values
       var secondAngle=stimTrial.select('Second Angle').values
       if (stimTrial.select('Stimulus Order').values==1){
         if ((firstAngle==315 && secResp==37) || (firstAngle==45 && secResp==39)){
           m_consecutive_incorrect=0;
           m_consecutive_correct++;
           mCorrect=true;
         }
         if ((secondAngle==315 && thirdResp==37)||(secondAngle==45 && thirdResp==39)){
           p_consecutive_incorrect=0;
           p_consecutive_correct++;
           pCorrect=true;

         }
         if ((firstAngle==315 && secResp!=37) || (firstAngle==45 && secResp!=39)){
           m_consecutive_incorrect++;
           m_consecutive_correct=0;
           mCorrect=false

         }
         if ((secondAngle==315 && thirdResp!=37)||(secondAngle==45 && thirdResp!=39)){
           p_consecutive_incorrect++
           p_consecutive_correct=0;
           pCorrect=false;

         }
       }else if(stimTrial.select('Stimulus Order').values==2){
         if ((firstAngle==315 && secResp==37) || (firstAngle==45 && secResp==39)){
           p_consecutive_incorrect=0;
           p_consecutive_correct++;
           pCorrect=true;

         }
         if ((secondAngle==315 && thirdResp==37)||(secondAngle==45 && thirdResp==39)){
           m_consecutive_incorrect=0;
           m_consecutive_correct++;
           mCorrect=true;

         }
         if ((firstAngle==315 && secResp!=37) || (firstAngle==45 && secResp!=39)){
           p_consecutive_incorrect++;
           p_consecutive_correct=0;
           pCorrect=false;

         }
         if ((secondAngle==315 && thirdResp!==37)||(secondAngle==45 && thirdResp!==39)){
           m_consecutive_incorrect++
           m_consecutive_correct=0;
           mCorrect=false;

         }

       }



     }
   }
   var test_procedure={
     timeline: [test_block,response1,response2,response3],
     timeline_variables:[{trial_type:'1'},{trial_type:'2'}],
     randomize_order: true,
     repetitions: 20,
   }

    var main_timeline=[];
    main_timeline.push(instructions_block,fixation_block,test_procedure)

    jsPsych.init({
      timeline: main_timeline,
      show_progress_bar: false,
      on_finish: function(){jsPsych.data.displayData();}

    })
    </script>
    </html>
