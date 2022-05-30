
$("#level-title").text("Press a key to start the game");

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started=false;
var level=0;


// here this key press function is used to check if any key is pressed or not in the key board
$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        
    }
})

// click is a event listner
$(".btn").click("click", function (event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    console.log(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})


function checkAnswer(level){
     if(userClickedPattern[level]===gamePattern[level] && userClickedPattern.length===gamePattern.length)
     {
       console.log("success");

       setTimeout(() => {
           nextSequence();
       }, 1000);
     }
     else{
         console.log("wrong ans");
         playSound("wrong");
         $("body").addClass("game-over");
         $("#level-title").text("click any key to restart the game");
         setTimeout(() => {
            $("body").removeClass("game-over");
         }, 200);
        
         startover();

     }
}

function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("lavel"+ level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(500).fadeOut(500).fadeIn(500);


    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    playSound(randomChosenColour);

}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    // for removing class
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function playSound(name) {

    $("#" + name).on("click", function () {
        const audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    });

}


function startover(){
   started=false;
   gamePattern=[];
   level=0;
}

