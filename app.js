/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls at least one dice which has 1, all his ROUND (but not GLOBAL) score gets lost. After that, it's the next player's turn
- If the player rolls a 6 on both dices, ALL his score gets lost (round & global)
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Global variables

var scores, roundScore, activePlayer, gamePlaying;

// Initializing game

init();

// Event listeners

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying) {
        // Random number
        var randNumberOne = Math.floor(Math.random() * 6) + 1;
        var randNumberTwo = Math.floor(Math.random() * 6) + 1;

        // Display the result
        var diceFirst = document.querySelector('.dice-0');
        var diceSecond = document.querySelector('.dice-1');
        diceFirst.style.display = 'block';
        diceSecond.style.display = 'block';
        diceFirst.src = 'dice-' + randNumberOne + '.png'; // Displaying random image of the dice (1-6)
        diceSecond.src = 'dice-' + randNumberTwo + '.png';

        // Update score only if number isn't one
        if(randNumberOne !== 1 && randNumberTwo !== 1) {
            // Add score
            roundScore += randNumberOne + randNumberTwo;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }

        // Delete score if two sixes comes across
        if (randNumberOne === 6 && randNumberTwo === 6) {
            document.getElementById('score-' + activePlayer).textContent = 0;
            scores[activePlayer] = 0;
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add current score to the global score
        scores[activePlayer] += roundScore;

        // Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if(scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
            document.querySelector('.dice-0').style.display = "none";
            document.querySelector('.dice-1').style.display = "none";
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            setTimeout(function() {
            location.reload();
            }, 5000);
        } else {
            nextPlayer();
        }
    } 
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    setTimeout(function() {
        document.querySelector('.dice-0').style.display = "none";
        document.querySelector('.dice-1').style.display = "none";
    }, 1200);
}


document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = "none";

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}