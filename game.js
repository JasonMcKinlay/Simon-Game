// Initialization
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var ongoing = false;
var level = 0;

// Start the game with button press
$(document).keydown(function(e) {
    if (!ongoing) {
        nextSequence();
        ongoing = true;
    }
});

// Event handlers for user clicks
$(".btn").click(function(e) {
    var userChosenColor = e.target.id;
    press($("#"+userChosenColor));
    userClickedPattern.push(userChosenColor)
    checkAnswer();
    //console.log(level);
});

// Next randomly generated button
function nextSequence() {
    var num = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[num];
    gamePattern.push(randomChosenColor);
    select($("#" + randomChosenColor));
    userClickedPattern = [];

    // Update h1
    level++;
    $("h1").text("Level " + level);
}

// Animation and sound for user button press
function press(button) {
    button.attr("class", button.attr("class")+" pressed");
    setTimeout(function() {
        button.attr("class", "btn " + button.attr("id"));
    }, 100);
    new Audio("sounds/" + button.attr("id") + ".mp3").play();
}

// Animation and sound for system button press
function select(button) {
    button.fadeOut(100).fadeIn(100);
    new Audio("sounds/" + button.attr("id") + ".mp3").play();
}

function checkAnswer() {
    if (userClickedPattern[userClickedPattern.length-1] == gamePattern[userClickedPattern.length-1]) {
        console.log("success");
        if (userClickedPattern.length-1 == level-1) {
            setTimeout(nextSequence, 800);
            console.log("level up")
        }
    }
    else {
        new Audio("sounds/wrong.mp3").play();
        $("body").attr("class", "game-over");
        setTimeout(function() {
            $("body").attr("class", "")
        }, 200);
        $("h1").text("Game over, press any key to restart.");
        
        gamePattern = [];
        ongoing = false;
        level = 0;

        console.log("fail");
        
    }
}