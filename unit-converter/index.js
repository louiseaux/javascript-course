let convertBtn = document.getElementById("convert-btn")
let inputEl = document.getElementById("input")
let lengthEl = document.getElementById("length-el")
let volumeEl = document.getElementById("volume-el")
let massEl = document.getElementById("mass-el")

const meterToFeet = 3.281
const literToGallon = 0.264
const kiloToPound = 2.204

convertBtn.addEventListener("click", function() {
    const baseValue = inputEl.value

    lengthEl.textContent =  `${baseValue} meters = ${(baseValue * meterToFeet).toFixed(3)} feet | ${baseValue} feet = ${(baseValue / meterToFeet).toFixed(3)} meters`
    volumeEl.innerHTML =  `${baseValue} liters = ${(baseValue * literToGallon).toFixed(3)} gallons | ${baseValue} gallons = ${(baseValue / literToGallon).toFixed(3)} liters`
    massEl.innerHTML =  `${baseValue} kilos = ${(baseValue * kiloToPound).toFixed(3)} pounds | ${baseValue} pounds = ${(baseValue / kiloToPound).toFixed(3)} kilos`
})