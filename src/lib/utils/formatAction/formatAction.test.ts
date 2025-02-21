import formatAction from './formatAction'

describe('formatAction', () => {
    test('formats single-word action', async () => {
        expect(formatAction('Spend')).toBe('spend')
    })

    test('formats multi-word action', async () => {
        expect(formatAction('IbcRelay')).toBe('ibc relay')
    })
})
