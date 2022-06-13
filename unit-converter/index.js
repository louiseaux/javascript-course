let num = document.getElementById("num")
num.value = 0
let convertBtn = document.getElementById("convert-btn")
let conversion1 = document.getElementById("m-ft")
let conversion2 = document.getElementById("l-gal")
let conversion3 = document.getElementById("kg-lbs")

convertBtn.addEventListener("click", function() {
    let sum1 = num.value * 3.28084
    let sum2 = num.value / 3.28084
    conversion1.innerHTML =  `${num.value} meters = ${sum1.toFixed(3)} feet | ${num.value} feet = ${sum2.toFixed(3)} meters`
    
    let sum3 = num.value * 0.264172
    let sum4 = num.value / 0.264172
    conversion2.innerHTML =  `${num.value} liters = ${sum3.toFixed(3)} gallons | ${num.value} gallons = ${sum4.toFixed(3)} liters`
          
    let sum5 = num.value * 2.2046
    let sum6 = num.value / 2.2046
    conversion3.innerHTML =  `${num.value} kilos = ${sum5.toFixed(3)} pounds | ${num.value} pounds = ${sum6.toFixed(3)} kilos`
    
})