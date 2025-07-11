const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T",
"U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s",
"t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#",
"$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

let passswordLength = document.getElementById("password-length")
let passwordOneEl = document.getElementById("password1-el")
let passwordTwoEl = document.getElementById("password2-el")
let messageEl = document.getElementById("message-el")

function getRandomCharacter() {
    let randomChar = Math.floor(Math.random() * characters.length)
    return characters[randomChar]
}

function generateRandomPassword() {
    let randomPassword = ""
    for ( let i = 0; i < passswordLength.value; i++ ) {
        randomPassword += getRandomCharacter()
    }
    return randomPassword
}

function generatePasswords() {
    if ( passswordLength.value > 18 ) {
        alert("Password length must be no more than 18 characters")
    } else if ( passswordLength.value < 8) {
        alert("Password length must be at least 8 characters")
    } else {
        passwordOneEl.textContent = generateRandomPassword()
        passwordTwoEl.textContent = generateRandomPassword()
        messageEl.textContent = ""
    }
}

function copyPassword(id) {
    let password = document.getElementById(id).textContent
    if (password !== "") {
        navigator.clipboard.writeText(password)
        messageEl.textContent = "Copied!"
        setTimeout(() => {
            messageEl.textContent = ""
          }, 1000);
    }
}