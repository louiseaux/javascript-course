let number = 20
let value = document.getElementById("value")
value.textContent = number

let conversion1 = document.getElementById("m-ft")
let sum1 = number * 3.28084
let sum2 = number / 3.28084
conversion1.textContent =  number + " meters = " + sum1.toFixed(3) + " feet | "
                            + number + " feet = " + sum2.toFixed(3) + " meters"


let conversion2 = document.getElementById("l-gal")
let sum3 = number * 0.264172
let sum4 = number / 0.264172
conversion2.textContent =  number + " liters = " + sum3.toFixed(3) + " gallons | "
                            + number + " gallons = " + sum4.toFixed(3) + " liters"

let conversion3 = document.getElementById("kg-lbs")
let sum5 = number * 2.2046
let sum6 = number / 2.2046
conversion3.textContent =  number + " kilos = " + sum5.toFixed(3) + " pounds | "
                            + number + " pounds = " + sum6.toFixed(3) + " kilos"