// Variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Keyboard click--------------------------------------

    $(document).keypress(function() {
        if (!started) {
          $("#level-title").text("Level " + level);
          nextSequence();
          started = true;
        }
      });


// user pattern ------------------------------------------
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

//------------Check answer ------------------------------------------------
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
  }, 200);
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

//--------------------Level increase-------------------------------
function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//-------------------------Play SOund----------------------------
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//---------------Animation-----------------------------------------
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//-----------------------StartOver---------------------------------
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
