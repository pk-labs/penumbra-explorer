import formatNumber from './formatNumber'

describe('formatNumber', () => {
    test('formats number as is', async () => {
        expect(formatNumber(1234567.89)).toBe('1,234,567.89')
        expect(formatNumber(100)).toBe('100')
    })

    test('formats number to fixed decimal places', async () => {
        expect(formatNumber(100, 2)).toBe('100.00')
    })
})
