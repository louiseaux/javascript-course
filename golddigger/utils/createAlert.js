// Define a listener function
export function createAlert(transaction) {
    console.log(`${transaction.date}, amount paid: $${transaction.amount}, price per Oz: $${transaction.price}, gold sold: ${transaction.weight} Oz`)
}