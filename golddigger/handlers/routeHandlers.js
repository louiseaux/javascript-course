import { goldPrices } from "../data/goldPrices.js";

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
    }, 3000)
}