import { blockSeconds } from '@/lib/constants'
import blocksDuration from './blocksDuration'

describe('blocksDuration', () => {
    test('returns days', async () => {
        expect(blocksDuration((60 * 60 * 24 * 3.5) / blockSeconds)).toBe('~3d')
    })

    test('returns hours', async () => {
        expect(blocksDuration((60 * 60 * 5) / blockSeconds)).toBe('~5hr')
    })

    test('returns minutes', async () => {
        expect(blocksDuration((60 * 7) / blockSeconds)).toBe('~7m')
    })

    test('returns seconds', async () => {
        expect(blocksDuration(43 / blockSeconds)).toBe('~43s')
    })
})
