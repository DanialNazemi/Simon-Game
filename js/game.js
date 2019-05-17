let btnColors = ['red', 'green', 'blue', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).on('keypress', function() {
    if(!started) {
        $('h1').text(`Level ${level}`);
        newSequence();
        started = true;
    }
});
const startOver = () => {
    level = 0;
    gamePattern = [];
    started = false;
}
const animatePress = currentColor => {
    $(`#${currentColor}`).addClass('pressed');
    setTimeout(() => {
        $(`#${currentColor}`).removeClass('pressed');
    }, 100);
}
const playSound = name => {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}
const newSequence = () => {
    userClickedPattern = [];
    $('h1').text(`Level ${level}`);
    let randNum = Math.floor(Math.random() * 4);
    let randChosenColor = btnColors[randNum];
    gamePattern.push(randChosenColor);

    $(`#${randChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randChosenColor);
    animatePress(randChosenColor);
    level++;
}

const checkAnswer = currentLevel => {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                newSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
        $('h1').text(`Game over 😢 Press Any Key to Start.`);
        startOver();
    }
}


$('.btn').on('click', function (event) {
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});