'use strict'

//? UI Elements
const checkBtn = document.querySelector('.check')
const againBtn = document.querySelector('.again')
const guessInput = document.querySelector('.guess')
// const score = document.querySelector('.score')
// const highscore = document.querySelector('.highscore')
const secretNum = document.querySelector('.number')

let rndNumber = 0
let guessedNum = 0
let highscoreNum = 0
let scoreNum = 20

//! Events
start()
checkBtn.addEventListener('click', checkNum)
againBtn.addEventListener('click', startAgain)

function start() {
    rndNumber = Math.floor(Math.random() * 20) + 1

    guessedNum = 0
    scoreNum = 20

    displayMessage('.message', 'Start guessing...')
    displayMessage('.score', scoreNum)
    displayMessage('.number', '?')

    checkBtn.disabled = false
    guessInput.value = ''
    document.body.style.backgroundColor = '#222'
    secretNum.style.width = '15rem'
}

function checkNum() {
    guessedNum = Number(guessInput.value)

    if (!guessedNum) {
        //!When the score is not declared

        displayMessage('.message', '🚫 No number')
        return
    }

    if (guessedNum !== rndNumber) {
        //! When the game is lost

        displayMessage(
            '.message',
            `Guessed num is too ${guessedNum > rndNumber ? 'high' : 'low'}`
        )
        scoreNum--
        displayMessage('.score', scoreNum)

        //! When the game is won
    } else if (guessedNum === rndNumber) {
        displayMessage('.message', `🎁 You have won. Let's play again`)
        displayMessage('.number', guessedNum)

        checkBtn.disabled = true
        document.body.style.backgroundColor = '#60b347'
        secretNum.style.width = '30rem'

        if (scoreNum > highscoreNum) {
            highscoreNum = scoreNum
            displayMessage('.highscore', highscoreNum)
        }
    }

    if (scoreNum < 1) {
        displayMessage('.message', 'You lost :( try again!')
        displayMessage('.number', guessedNum)

        checkBtn.disabled = true
        guessInput.value = ''
        document.body.style.backgroundColor = 'red'
    }
}

function startAgain() {
    start()
}

function displayMessage(selector, msg) {
    document.querySelector(selector).textContent = msg
}
