import { blockSeconds } from '@/lib/constants'
import blocksDuration from './blocksDuration'

describe('blocksDuration', () => {
    describe('short format', () => {
        test('returns days', async () => {
            expect(blocksDuration((60 * 60 * 24 * 3.5) / blockSeconds)).toBe(
                '~3d'
            )
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

    describe('long format', () => {
        test('returns days', async () => {
            expect(
                blocksDuration((60 * 60 * 24 * 1.1) / blockSeconds, 'long')
            ).toBe('~1 day 2 hours')

            expect(
                blocksDuration((60 * 60 * 24 * 2.2) / blockSeconds, 'long')
            ).toBe('~2 days 4 hours')
        })

        test('returns hours', async () => {
            expect(blocksDuration((60 * 60 * 1.1) / blockSeconds, 'long')).toBe(
                '~1 hour 6 minutes'
            )

            expect(blocksDuration((60 * 60 * 2.2) / blockSeconds, 'long')).toBe(
                '~2 hours 12 minutes'
            )
        })

        test('returns minutes', async () => {
            expect(blocksDuration((60 * 1.1) / blockSeconds, 'long')).toBe(
                '~1 minute 6 seconds'
            )

            expect(blocksDuration((60 * 2.2) / blockSeconds, 'long')).toBe(
                '~2 minutes 12 seconds'
            )
        })

        test('returns seconds', async () => {
            expect(blocksDuration(1 / blockSeconds, 'long')).toBe('~1 second')
            expect(blocksDuration(2 / blockSeconds, 'long')).toBe('~2 seconds')
        })
    })
})
