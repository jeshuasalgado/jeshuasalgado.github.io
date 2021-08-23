var questions = [
  {
    title: " 2 + 2 =",
    choices: ["1", "2", "5", "4"],
    answer: "4"
  },
  {
    title: " 3 + 3 =",
    choices: ["1", "0", "9", "6"],
    answer: "6"
  },
  {
    title: " 10 + 10 =",
    choices: ["10","2","20","0"],
    answer: "20"
  },
  {
    title: " 2 - 1 =",
    choices: ["1", "6", "9", "3"],
    answer: "1"
  },
  {
    title:" 4 + 4 =",
    choices: ["2", "8", "1", "9"],
    answer: "8"
  }
];
//var for math quiz
var currentQuestionIndex = 0;
var time = questions.length * 25;
var timerId;

// vars to reference
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// SOUND/MUSIC
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
//timer for in game var
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // updatecurrent question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  choicesEl.innerHTML = "";

  // loop over choices
  currentQuestion.choices.forEach(function(choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    //click event listener to every question
    choiceNode.onclick = questionClick;
    choicesEl.appendChild(choiceNode);
  });
}



function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 15;

 if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
//play timer sounds of right or wrong
    sfxWrong.play();

    feedbackEl.textContent = "Wrong!";
  } else {
    sfxRight.play();
feedbackEl.textContent = "Correct!";
  }
//feedback function for right or wrongg next to the set timer
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);
//next question
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}
//change timer ending 
function quizEnd() {
  clearInterval(timerId);
// last page/screeen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
}
//timer ending/ran out of time
function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}
//get high score var,local storage 
function saveHighscore() {
  var initials = initialsEl.value.trim();
  if (initials !== "") {
  var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
   //var for new score 
  var newScore = {
      score: time,
      initials: initials
    };

  

    // push to new local storage 
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscores.html";
  }
}
//save game function
function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}
submitBtn.onclick = saveHighscore;
//player clicks start button 
startBtn.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;
