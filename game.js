var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userExperience = [];
var level = 0;
var started = false;

function nextSequence() {
  userExperience = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColor = buttonColors[randomNumber];;
  gamePattern.push(randomChoosenColor);
  $("#" + randomChoosenColor).fadeOut(100).fadeIn(100);
  $("h1").text("Level " + level);
  console.log(gamePattern);

}

function checkAnswer(ind) {
  if (userExperience[ind] === gamePattern[ind]) {
    console.log("success");
    console.log(userExperience);


    if (userExperience.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    var go = new Audio("sounds/wrong.mp3");
    go.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart")
    startOver();
  }


}

function startOver() {
  userExperience = [];
  gamePattern = [];
  started=false;
  level = 0;
}


function playSound(name) {
  var music = new Audio();
  music.src = "sounds/" + name + ".mp3";
  music.play();
}


function animatePress(currColor) {
  $("#" + currColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currColor).removeClass('pressed');
  }, 100);
}


if(started===false){
$(document).on("keypress", function() {
  started=true;
  setTimeout(function() {
  nextSequence();
}, 500);
  $("h1").text("Level " + level);
});

}



$(".btn").click(function() {
  var userChoosenColor = $(this).attr("id");
  userExperience.push(userChoosenColor);

  animatePress(userChoosenColor);
  playSound(userChoosenColor);

  checkAnswer(userExperience.length - 1);
});
