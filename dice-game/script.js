'use strict';

//selecting the elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btn_new_game = document.querySelector('.btn--new');
const btn_hold = document.querySelector('.btn--hold');
const btn_roll = document.querySelector('.btn--roll');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

//background color changer variable
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

score0El.textContent = 0;
score1El.textContent = 0;



//starting conditions
let scores = [0,0];
let current_score = 0;
let activePlayer = 0;

let playing = true;

diceEl.classList.add('hidden');

const switch_player = function() {
    current_score = 0;
    document.getElementById(`current--${activePlayer}`).textContent = current_score;

    //masyadong tricy tong part na to na parang di ko maiisip gawin
    activePlayer = activePlayer === 0 ? 1 : 0;

    //player player--0 player--active (yung naka WHITE BACKGROUND) | change change vice versa
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//rolling the dice functionality
btn_roll.addEventListener('click', function() {
    //generate random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);

    //display the generated dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;


    //check if the dice roll === 1, if true : switch player then
    //check first whos the active player
    if(dice !== 1) {
        current_score += dice;
        document.getElementById(`current--${activePlayer}`).textContent = current_score;
    } else {
        //code block for switching the player
        switch_player();
    }
});

btn_hold.addEventListener('click', function(){

    scores[activePlayer] += current_score;

    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    if(scores[activePlayer] >= 40) {
        //this active player is the winner
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        btn_hold.disabled = true;
        btn_roll.disabled = true;
    } else {
        switch_player();
    }
});


btn_new_game.addEventListener('click', function() {

    scores = [0,0];

    //ni remove ang dice
    diceEl.classList.add('hidden');

    score0El.textContent = 0;
    score1El.textContent = 0;

    current0El.textContent = 0;
    current1El.textContent = 0;
    
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');

    player1El.classList.remove('player--active');

    player0El.classList.add('player--active');

    btn_hold.disabled = false;
    btn_roll.disabled = false;
});

