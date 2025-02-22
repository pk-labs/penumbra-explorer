/* istanbul ignore file */
import { faker } from '@faker-js/faker'

export const generateBlock = () => ({
    date: faker.date.recent().toISOString(),
    height: faker.number.int({ max: 9999999, min: 1000000 }),
    id: faker.string.uuid(),
    proposer:
        'penumbravalid' +
        faker.finance
            .bitcoinAddress({ network: 'testnet', type: 'bech32' })
            .slice(0, 7) +
        '...',
    transactions: faker.number.int({ max: 30, min: 0 }),
})

export const generateTransaction = () => ({
    blockHeight: faker.number.int({ max: 9999999, min: 1000000 }),
    date: faker.date.recent().toISOString(),
    hash: faker.finance.bitcoinAddress({ network: 'testnet', type: 'bech32' }),
    id: faker.string.uuid(),
    latestAction: faker.helpers.arrayElement([
        'delegate',
        'undelegate',
        'swap claim',
        'undelegate claim',
        'schedule a dutch auction',
        'end a dutch auction',
        'withdraw from a dutch auction',
        'ics20 withdrawal',
    ]),
    totalActions: faker.number.int({ max: 15, min: 1 }),
})
