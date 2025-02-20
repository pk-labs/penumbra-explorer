/* istanbul ignore file */
import fs from 'node:fs'
import path from 'node:path'
import { generateBlock, generateTransaction } from '../utils'

console.log('Generating fixtures ...')

const blocks = Array.from({ length: 100 })
    .map(generateBlock)
    .toSorted((a, b) => Date.parse(b.date) - Date.parse(a.date))

let filename = path.join(__dirname, 'blocks.json')
fs.writeFileSync(filename, JSON.stringify(blocks, null, 2))
console.log(filename)

const transactions = Array.from({ length: 100 })
    .map(generateTransaction)
    .toSorted((a, b) => Date.parse(b.date) - Date.parse(a.date))

filename = path.join(__dirname, 'transactions.json')
fs.writeFileSync(
    path.join(__dirname, 'transactions.json'),
    JSON.stringify(transactions, null, 2)
)
console.log(filename)
