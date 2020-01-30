function highScores() {
    var scores = JSON.parse(window.localStorage.getItem("highScores")) || [];
    //put higher score up and lower scores down
    scores.sort(function (a, b) {
        return b.score - a.score
    });
    //
    scores.forEach(function (score) {
        var liEl = document.createElement("li");
        liEl.textContent = score.initials + ": " + score.score;

        var scoresHigh = document.getElementById("highscores");
        scoresHigh.appendChild(liEl);
    });

}
highScores();

//wire clear highscores list button function here.