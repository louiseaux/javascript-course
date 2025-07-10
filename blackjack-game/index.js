let player = {
    name: "Ashlyn",
    chips: 420
}

let cards = []
let sum = 0
let hasBlackjack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let cardsEl = document.getElementById("cards-el")
let sumEl = document.getElementById("sum-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = `${player.name}: £${player.chips}`

function getRandomNumber() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber === 1) {
        return 11
    } else if (randomNumber > 10) {
        return 10
    }
    return randomNumber
}

function startGame() {
    if (player.chips >= 10) {
        isAlive = true
        let firstCard = getRandomNumber()
        let secondCard = getRandomNumber()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        player.chips -= 10
        playerEl.textContent = `${player.name}: £${player.chips}`
        renderGame()
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += `${cards[i]} `
    }

    sumEl.textContent = `Sum: ${sum}`
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        isAlive = false
        player.chips += 20
        playerEl.textContent = `${player.name}: £${player.chips}`
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}

function newCard() {
    if (isAlive && !hasBlackjack) {
        let card = getRandomNumber()
        cards.push(card)
        sum += card
        renderGame()
    }
}