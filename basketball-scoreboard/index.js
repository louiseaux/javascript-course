let homeScore = 0
let guestScore = 0
let homeEl = document.getElementById("home-el")
let guestEl = document.getElementById("guest-el")

function addScore(id) {
    let button = document.getElementById(id).textContent
    if (id.includes("home")) {
        homeScore += parseInt(button)
        homeEl.textContent = homeScore
    } else {
        guestScore += parseInt(button)
        guestEl.textContent = guestScore
    }
}

function newGame() {
    homeScore = 0
    homeEl.textContent = 0
    guestScore = 0
    guestEl.textContent = 0
}