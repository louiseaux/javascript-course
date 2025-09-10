import { goldPrices } from "../data/goldPrices.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { sendResponse } from "../utils/sendResponse.js";
import { addNewTransaction } from "../utils/addNewTransaction.js"
import { transactionEvents } from '../events/transactionEvents.js'

export async function handlePrices(req, res) {
    res.statusCode = 200

    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")

    setInterval( () => {
        let randomPrice = (Math.random() * (goldPrices.maxPrice - goldPrices.minPrice) + goldPrices.minPrice).toFixed(2)

        res.write(
            `data: ${JSON.stringify({
                event: 'price-update',
                price: randomPrice
            })}\n\n`
        )
    }, 2000)
}

export async function handleTransaction(req, res) {
    
    try {
        const parsedBody = await parseJSONBody(req)
        await addNewTransaction(parsedBody)
        transactionEvents.emit('transaction-added', parsedBody)
        sendResponse(res, 201, 'application/json', JSON.stringify(parsedBody))
    } catch (err) {
        sendResponse(res, 400, 'application/json', JSON.stringify({error: err}))
    }
}