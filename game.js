var buttonColours = ["red","green","yellow","blue"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keydown(function(event){
  var keyPresed = event.key;
  if(!started){
    $("h1").text("Level"+level);
    newSequence();
    started = true;
  }
  // else(){
    //
    // }
  });



function animatePress(currentColour){
  // $("#"+currentColour).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}


function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("Correct");
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        newSequence();
      },1000);
    }
  }
  else{
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    highScore(level);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function newSequence(){
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  $("h1").text("Level "+level);
  level+=1;
}


$(".btn").click(function (event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function highScore(lastLevel){
  $("#score").text("High Score - "+(lastLevel-1));
}

function startOver(){
  started = false;
  gamePattern = [];
  level = 0;
}
