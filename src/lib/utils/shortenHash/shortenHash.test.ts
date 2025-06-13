import shortenHash from './shortenHash'

describe('shortenHash', () => {
    describe('middle truncation', () => {
        test('shortens hash to length plus ellipsis', async () => {
            expect(
                shortenHash('tb12u5v7v30yktv9tv07ntnzxa0uzu48vtrh2js5sd', 16)
            ).toBe('tb12u5v7...rh2js5sd')
        })

        test('returns hash unmodified when equal or less than length', async () => {
            expect(shortenHash('tb12u5v7v30yktv9', 16)).toBe('tb12u5v7v30yktv9')
        })
    })

    describe('end truncation', () => {
        test('shortens hash to length plus ellipsis', async () => {
            expect(
                shortenHash(
                    'tb12u5v7v30yktv9tv07ntnzxa0uzu48vtrh2js5sd',
                    19,
                    'end'
                )
            ).toBe('tb12u5v7v30yktv9tv0...')
        })

        test('returns hash unmodified when equal or less than length', async () => {
            expect(shortenHash('tb12u5v7v30yktv9tv0', 19, 'end')).toBe(
                'tb12u5v7v30yktv9tv0'
            )
        })
    })
})
