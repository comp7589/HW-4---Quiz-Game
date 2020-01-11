// variables to keep track of quiz state
var currentQuestionIndex = 0; //*
var time = questions.length * 15; //*
var timerId;
// var score = 0;
// variables to reference DOM elements
var questionsEl = document.getElementById("questions");  //**
var timerEl = document.getElementById("time");  //*
var choicesEl = document.getElementById("choices");  //*
var submitBtn = document.getElementById("submit");  //*
var startBtn = document.getElementById("start");  //*
// var scoreEl = document.getElementById("score")
//bonus shit
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

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
    var startScreen = document.getElementById("start-screen");//holds start screen that's visible

    startScreen.setAttribute("class", "hide");//hides start screen by adding hide class from css = display: none.

    questionsEl.removeAttribute("class");// unhides questions.

    //start timer
    timerId = setInterval(clockTick, 1000);//sets timerID to setInterval function.

    //show starting time and then call getQuestion
    timerEl.textContent = time;// time = questions.length * 15;

    getQuestions();
}

/*

put quizEnd function here to terminate timer 
                                                  */

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
    //check if user guess is wrong
    if(this.value !== questions[currentQuestionIndex].answer) {
        feedbackEl.textContent = "Wrong!!";
    }else {
        feedbackEl.textContent = "Correct!!";
    }
    currentQuestionIndex++;

    if(currentQuestionIndex === questions.length) {
        alert("Quiz is over!");//quizEnd() goes here.

    }else {
        getQuestions();
    }
}