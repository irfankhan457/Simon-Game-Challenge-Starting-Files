var buttonColours = ["red", "blue", "green", "yellow"];

var gamePatter = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnwer(userClickedPattern.length-1);
})

function checkAnwer(currentLevel) {

    if(gamePatter[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if(userClickedPattern.length === gamePatter.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        console.log("wrong");
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColour = buttonColours[randomNumber];
    gamePatter.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function playSound(soundName) {
    var audio = new Audio("sounds/"+soundName+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");

    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePatter = [];
    started = false;
}










