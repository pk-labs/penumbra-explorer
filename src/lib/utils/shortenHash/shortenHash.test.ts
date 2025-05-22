import shortenHash from './shortenHash'

describe('shortenHash', () => {
    describe('middle truncation', () => {
        test('shortens hash with 19 or more characters', async () => {
            expect(
                shortenHash('tb12u5v7v30yktv9tv07ntnzxa0uzu48vtrh2js5sd')
            ).toBe('tb12u5v7...rh2js5sd')
        })

        test('returns hash unmodified when less than 19 characters', async () => {
            expect(shortenHash('tb12u5v7v30yktv9tv')).toBe('tb12u5v7v30yktv9tv')
        })
    })

    describe('end truncation', () => {
        test('shortens hash with 22 or more characters', async () => {
            expect(
                shortenHash('tb12u5v7v30yktv9tv07ntnzxa0uzu48vtrh2js5sd', 'end')
            ).toBe('tb12u5v7v30yktv9tv0...')
        })

        test('returns hash unmodified when less than 22 characters', async () => {
            expect(shortenHash('tb12u5v7v30yktv9tv07n', 'end')).toBe(
                'tb12u5v7v30yktv9tv07n'
            )
        })
    })
})
