import { EventEmitter } from 'node:events'
import { createAlert } from '../utils/createAlert.js'

export const transactionEvents = new EventEmitter()

transactionEvents.on('transaction-added', createAlert)