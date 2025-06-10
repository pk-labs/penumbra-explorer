import { blockSeconds } from '@/lib/constants'
import blocksToTime from './blocksToTime'

describe('blocksToTime', () => {
    test('returns days', async () => {
        expect(blocksToTime((60 * 60 * 24 * 3.5) / blockSeconds)).toBe('~3d')
    })

    test('returns hours', async () => {
        expect(blocksToTime((60 * 60 * 5) / blockSeconds)).toBe('~5hr')
    })

    test('returns minutes', async () => {
        expect(blocksToTime((60 * 7) / blockSeconds)).toBe('~7m')
    })

    test('returns seconds', async () => {
        expect(blocksToTime(43 / blockSeconds)).toBe('~43s')
    })
})
