// variables to keep track of quiz state
var currentQuestionIndex = 0; //*
var time = questions.length * 15; //*
var timerId;
// variables to reference DOM elements
var questionsEl = document.getElementById("questions");  //**
var timerEl = document.getElementById("time");  //*
var choicesEl = document.getElementById("choices");  //*
var submitBtn = document.getElementById("submit");  //*
var startBtn = document.getElementById("start");  //*
var scoreEl = document.getElementById("final-score")
//bonus shit
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
/* sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");*/


function clockTick() {//used in setInterval in startQuiz, controls time and quiz end
    // update time
    time--;
    timerEl.textContent = time;//displays the time
    // check if user ran out of time, fires if timer runs out
    if (time <= 0) {
        quizEnd();
    }
}

//user clicks button to start quiz.
startBtn.onclick = startQuiz;

function startQuiz() {

    $("#start-screen").hide();
    var startScreen = document.getElementById("start-screen");//holds start screen that's visible

    startScreen.setAttribute("class", "hide");//hides start screen by adding hide class from css = display: none.

    questionsEl.removeAttribute("class");// unhides questions.

    //start timer
    timerId = setInterval(clockTick, 1000);//sets timerID to setInterval function.

    //show starting time and then call getQuestion
    timerEl.textContent = time;// time = questions.length * 15;

    getQuestions();
}

//kill quiz and timer
function quizEnd() {
    console.log("CALLED QUIZ END", currentQuestionIndex)
    $("#feedback").hide();
    $("#questions").hide();
    $("#end-screen").show();

    if (questions[currentQuestionIndex] === 4 || time === 0) {
        clearInterval(timerId);// Kill timer when clock is zero.
        showScore();//show score function initialize here.
    }

    scoreEl.textContent = time;//set time equal to score.
    clearInterval(timerId);//Kill timer when quiz is complete.
}

function showScore() { 
    
    $("#end-screen").show();
    //clear screen. display none.
    //ask user for initials.
    $("#intials").hide();

    
    var initials = initialsEl.value.trim();
    console.log(initials);

    if (initials !== "") {
        
        var highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
        
        var highScoreObject = {
            score: time,
            initials: initials
        }

        highScores.push(highScoreObject);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        console.log(time);
        window.location.href = "highScores.html";//page redirect.
    }
}
submitBtn.onclick = showScore;

function getQuestions() {
    var currentQuestion = questions[currentQuestionIndex];// var currentQuestionIndex = 0;

    //update title element with current question/index
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    /*clear out any old question choices*/
    choicesEl.innerHTML = "";

    // loop over choices
    currentQuestion.choices.forEach(function (choice, index) {
        //create new button for each choice, set attributes

        var choiceOption = document.createElement("button");
        choiceOption.setAttribute("class", "choice");
        choiceOption.setAttribute("value", choice);

        choiceOption.textContent = index + 1 + ". " + choice;

        /*attach click event listener to each choice*/
        choiceOption.onclick = questionClick;

        //display on the page
        choicesEl.appendChild(choiceOption);
    });


}
function questionClick() {
    console.log(this);
    console.log(currentQuestionIndex)
    //check if user guess is wrong
    if (this.value !== questions[currentQuestionIndex].answer) {
        feedbackEl.textContent = "Wrong!!";
        time -= 15;
    } else {
        feedbackEl.textContent = "Correct!!";
    }
    currentQuestionIndex++;
    console.log(currentQuestionIndex)
    if (currentQuestionIndex > 4) return quizEnd();

    if (currentQuestionIndex === questions.length) {
        // alert("Quiz is over!");
        quizEnd();

    } else {
        getQuestions();
    }
}