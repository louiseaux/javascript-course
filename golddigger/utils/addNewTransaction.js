import path from 'node:path'
import fs from 'node:fs/promises'
import { getData } from './getData.js'

export async function addNewTransaction(newTransaction) {

  try { 

    const transactions = await getData()
    transactions.push(newTransaction)
    
    const pathJSON = path.join('data', 'data.json')
    
    await fs.writeFile(
      pathJSON,
      JSON.stringify(transactions, null, 2),
      'utf8'
    )
  } catch (err) {
    throw new Error(err)
  }

}