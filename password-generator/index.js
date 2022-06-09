const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T",
"U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s",
"t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#",
"$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

let length = document.getElementById("length")
let password1El = document.getElementById("password1-el")
let password2El = document.getElementById("password2-el")
let messageEl = document.getElementById("message-el")

function generateRandomNumber() {
    let randomNumber = Math.floor(Math.random() * characters.length)
    return randomNumber
}

function generatePassword() {
    let password = ""
    for ( let i = 0; i < length.value; i++ ) {
        password += characters[generateRandomNumber()]
    }
    return password
}

function getPasswords() {
    if ( length.value > 20 ) {
        alert("Password length must be no more than 20 characters")
    } else {
        password1El.textContent = generatePassword()
        password2El.textContent = generatePassword()
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