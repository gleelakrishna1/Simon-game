
var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
$(document).on("keydown",function(){
  if(level===0){
    nextSequence();
  }
});
$(".start_btn").on("click",function(){
  if(level===0){
    nextSequence();
  }
});


$(".btn").on("click",function(){
  playSound(this.id);
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("Success");
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){nextSequence();},1000);
      userClickedPattern=[];
    }
  }
  else{
    var audio=new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over")
    setTimeout(function(){$("body").removeClass("game-over");},200);
    $("h1").text("Game Over! Press any key to restart.");
    startOver();
  }
}


function nextSequence(){
  level+=1;
  $("h1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);


}

function playSound(name){
  var sound=new Audio("./sounds/"+name+".mp3");
  sound.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){ $("#"+currentColor).removeClass("pressed");},100);
}

function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
}
