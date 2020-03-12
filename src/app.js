/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

const DEFAULT_WINNING_SCORE = 100;

var scores = [0, 0],
  activePlayer,
  roundScore,
  isPlaying,
  winningScore,
  previousDice1,
  previousDice2;

newGame();

//textContent to change text in tag
//document.querySelector("#current-" + activePlayer).textContent = dice;
//innerHTML to change the tag itself and the text inside
//document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";

function nextPlayer() {
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = "0";
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.querySelector("#dice-0").style.display = "none";
  document.querySelector("#dice-1").style.display = "none";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  previousDice1 = 0;
  previousDice2 = 0;
}

function newGame() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  isPlaying = true;
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector("#dice-0").style.display = "none";
  document.querySelector("#dice-1").style.display = "none";
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  winningScore = document.querySelector(".final-score").value;
  if (winningScore === "") {
    winningScore = DEFAULT_WINNING_SCORE;
  }
}

document.querySelector(".btn-new").addEventListener("click", newGame);

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (isPlaying) {
    //1. Roll dice

    var dice1 = Math.floor(Math.random() * 6 + 1);
    var dice2 = Math.floor(Math.random() * 6 + 1);

    //If previous dice and dice are both 6 then the player lose ALL their scores
    console.log(previousDice1);
    console.log(previousDice2);
    console.log(dice1);
    console.log(dice2);
    if (
      (dice1 === 6 || dice2 === 6) &&
      (previousDice1 === 6 || previousDice2 === 6)
    ) {
      console.log("LOLOLOLOL");
      scores[activePlayer] = 0;
      document.getElementById("score-" + activePlayer).textContent = "0";

      nextPlayer();
    } else if (dice1 !== 1 && dice2 !== 1) {
      //2. Display the result
      var diceDOM1 = document.querySelector("#dice-0");
      diceDOM1.style.display = "block";
      diceDOM1.src = "dice-" + dice1 + ".png";

      var diceDOM2 = document.querySelector("#dice-1");
      diceDOM2.style.display = "block";
      diceDOM2.src = "dice-" + dice2 + ".png";
      previousDice1 = dice1;
      previousDice2 = dice2;

      //3. Update the round score, etc
      //Add score
      roundScore += dice1 + dice2;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Switch player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (isPlaying) {
    //Add current score to global score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#dice-0").style.display = "none";
      document.querySelector("#dice-1").style.display = "none";
      document.querySelector(
        "#name-" + activePlayer
      ).textContent = "winner!".toUpperCase();
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      isPlaying = false;
    } else {
      //Switch player
      nextPlayer();
    }
  }
});
