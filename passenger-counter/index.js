let count = 0
let countEl = document.getElementById("count-el")
let saveEl = document.getElementById("save-el")

function increment() {
    console.log("Increment button clicked")
    count += 1
    countEl.textContent = count
}

function save() {
    console.log("Save button clicked")
    let countStr = count + " - "
    saveEl.textContent += countStr
    count = 0
    countEl.textContent = 0
}

console.log("Let's count rows!")