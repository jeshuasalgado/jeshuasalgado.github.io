function printHighscores() {
  //get scores from localstorage
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // sort highscores by score
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function(score) {
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}//clear the scores for game
function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}



document.getElementById("clear").onclick = clearHighscores;
//run high scores for game
printHighscores();
