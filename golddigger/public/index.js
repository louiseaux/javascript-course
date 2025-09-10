const eventSource = new EventSource("/api")

const connectionStatus = document.getElementById('connection-status')
const priceDisplay = document.getElementById("price-display")

const form = document.getElementById("investmentForm")
const dialog = document.querySelector("dialog")
const closeButton = document.querySelector("dialog button")

// Handle live price updates
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    const price = data.price
    connectionStatus.textContent = 'Live Price 🟢'
    priceDisplay.textContent = price
}

// Handle connection loss
eventSource.onerror = () => {
    connectionStatus.textContent = 'Disconnected 🔴'
    priceDisplay.textContent = '----.--'
    console.log("Connection lost. Attempting to reconnect...")
}

form.addEventListener("submit", async function (event) {
    event.preventDefault()

    const investmentSummary = document.getElementById("investment-summary")

    const investmentAmount = document.getElementById("investment-amount").value
    const price = priceDisplay.textContent
    const weight = (investmentAmount / price).toFixed(4)

    if (isNaN(weight)) {
        investmentSummary.textContent = `Error. Please try again.`
        dialog.showModal()
        return
    }

    const isoDateString = new Date().toISOString()

    const formData = {
        date: isoDateString,
        amount: investmentAmount,
        price: price,
        weight: weight
    }

    try {
        // Send form data using fetch API
        const response = await fetch("./api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        if (response.ok) {
            investmentSummary.textContent = `You just bought ${weight} ounces (ozt) for $${investmentAmount}. \n You will receive documentation shortly.`
        } else {
            investmentSummary.textContent = `Server error. Please try again.`
            console.log("Server Error:", response.statusText)
        }
    } catch (error) {
        investmentSummary.textContent = `Error. Please try again.`
        console.log("Error:", error)
    }
    dialog.showModal()
})

closeButton.addEventListener("click", () => {
    dialog.close()
})