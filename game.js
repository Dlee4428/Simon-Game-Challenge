var buttonColours = ["red", "blue", "green", "yellow"]; // Array of button Colors
var gamePattern = []; // Declare empty array variable;
var userClickedPattern = [];
var started = false // Check first keypressed to start level
var level = 0; // variable starts at level 0

// Check which button is pressed
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id"); // local variable for user chosen id color
    userClickedPattern.push(userChosenColour); // Append userChosen id to array.
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length -1);
});

// Check when keypressed
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


// Determine sequence of colours
function nextSequence(){
    // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    // Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); // Random variable between 0 to 3
    var randomChosenColour = buttonColours[randomNumber]; // Button Colors are chosen between red-0, blue-1, green-2, yellow-3
    gamePattern.push(randomChosenColour); // Appends new variable to the back of the array

    // Fade Animation
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // Audio Buttons
    playSound(randomChosenColour);
};

function playSound(name){
    // Audio Buttons
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColour){
    // jQuery to add pressed class to the button that gets clicked
    $("#" + currentColour).addClass("pressed");

    // Remove class after 100 millesec timeout
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

function animateGameOver(){
    // Change h1 text
    $("#level-title").text("Game Over, Press Any Key to Restart");
    // Add game-over class from css
    $("body").addClass("game-over");
    // Remove game-over class after 200 millisec timeout
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
};

// Reset all level parameters
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
};

function checkAnswer(currentLevel){
    //  Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern.
    //  If so then log "success", otherwise log "wrong".
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("Success");

        //  If the user got the most recent answer right in step 3,
        //  then check that they have finished their sequence with another if statement.
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        };
    } else {
        console.log("wrong");
        playSound("wrong");
        animateGameOver();
        startOver();
    }
};
