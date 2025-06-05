import { secondsPerBlock } from '@/lib/constants'
import blocksToTime from './blocksToTime'

describe('blocksToTime', () => {
    test('returns days', async () => {
        expect(blocksToTime((60 * 60 * 24 * 3.5) / secondsPerBlock)).toBe('~3d')
    })

    test('returns hours', async () => {
        expect(blocksToTime((60 * 60 * 5) / secondsPerBlock)).toBe('~5hr')
    })

    test('returns minutes', async () => {
        expect(blocksToTime((60 * 7) / secondsPerBlock)).toBe('~7m')
    })

    test('returns seconds', async () => {
        expect(blocksToTime(43 / secondsPerBlock)).toBe('~43s')
    })
})
