let number = document.getElementById("number")
let value = document.getElementById("value")

let conversion1 = document.getElementById("m-ft")
let conversion2 = document.getElementById("l-gal")
let conversion3 = document.getElementById("kg-lbs")

function submit() {
    console.log(number.value)
    if(!isNaN(number.value)){ // doesn't work for empty string
        value.textContent = number.value

        let sum1 = number.value * 3.28084
        let sum2 = number.value / 3.28084
        conversion1.textContent =  number.value + " meters = " + sum1.toFixed(3) + " feet | "
                                    + number.value + " feet = " + sum2.toFixed(3) + " meters"
    
        let sum3 = number.value * 0.264172
        let sum4 = number.value / 0.264172
        conversion2.textContent =  number.value + " liters = " + sum3.toFixed(3) + " gallons | "
                                    + number.value + " gallons = " + sum4.toFixed(3) + " liters"
           
        let sum5 = number.value * 2.2046
        let sum6 = number.value / 2.2046
        conversion3.textContent =  number.value + " kilos = " + sum5.toFixed(3) + " pounds | "
                                    + number.value + " pounds = " + sum6.toFixed(3) + " kilos"
    }
}