const eventSource = new EventSource("/api/price")

const priceDisplay = document.getElementById("price-display")

const form = document.getElementById("investmentForm")
const dialog = document.querySelector("dialog")
const closeButton = document.querySelector("dialog button")

// Handle live price updates
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    const price = data.price
    priceDisplay.textContent = price
}

// Handle connection loss
eventSource.onerror = () => {
    console.log("Connection lost. Attempting to reconnect...")
}

form.addEventListener("submit", async function (event) {
    event.preventDefault()

    const price = priceDisplay.textContent
    const investmentAmount = document.getElementById("investment-amount").value

    const investmentSummary = document.getElementById("investment-summary")
    investmentSummary.textContent = `You just bought ${(investmentAmount / price).toFixed(1)} ounces (ozt) for $${investmentAmount}. \n You will receive documentation shortly.`
    dialog.showModal()
})

closeButton.addEventListener("click", () => {
    dialog.close()
})