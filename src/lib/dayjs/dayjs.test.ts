import dayjs from './dayjs'

describe('dayjs', () => {
    describe('relative time formats', () => {
        test('future date as 0s ago', async () => {
            const now = dayjs()
            expect(now.to(now.add(1, 'second'))).toBe('0s ago')
        })

        test('1 second difference as 1s ago', async () => {
            const now = dayjs()
            expect(now.to(now.subtract(1, 'second'))).toBe('1s ago')
        })

        test('2-59 seconds difference as 2-59s ago', async () => {
            const now = dayjs()
            expect(now.to(now.subtract(2, 'seconds'))).toBe('2s ago')
            expect(now.to(now.subtract(59, 'seconds'))).toBe('59s ago')
        })

        test('60-119 seconds difference as 1min ago', async () => {
            const now = dayjs()
            expect(now.to(now.subtract(60, 'seconds'))).toBe('1min ago')
            expect(now.to(now.subtract(119, 'seconds'))).toBe('1min ago')
        })

        test('2-59 minutes difference as 2-59min ago', async () => {
            const now = dayjs()
            expect(now.to(now.subtract(2, 'minutes'))).toBe('2min ago')
            expect(now.to(now.subtract(59, 'minutes'))).toBe('59min ago')
        })

        test('60-119 minutes difference as 1hr ago', async () => {
            const now = dayjs()
            expect(now.to(now.subtract(60, 'minutes'))).toBe('1hr ago')
            expect(now.to(now.subtract(119, 'minutes'))).toBe('1hr ago')
        })

        test('2-23 hours difference as 2-23hr ago', async () => {
            const now = dayjs()
            expect(now.to(now.subtract(2, 'hours'))).toBe('2hr ago')
            expect(now.to(now.subtract(23, 'hours'))).toBe('23hr ago')
        })

        test('24-47 hours difference as 1d ago', async () => {
            const now = dayjs()
            expect(now.to(now.subtract(24, 'hours'))).toBe('1d ago')
            expect(now.to(now.subtract(47, 'hours'))).toBe('1d ago')
        })

        test('2-6 days difference as 2-6d ago', async () => {
            const now = dayjs()
            expect(now.to(now.subtract(2, 'days'))).toBe('2d ago')
            expect(now.to(now.subtract(6, 'days'))).toBe('6d ago')
        })

        test('7-13 days difference as 1wk ago', async () => {
            const now = dayjs()
            expect(now.to(now.subtract(7, 'days'))).toBe('1wk ago')
            expect(now.to(now.subtract(13, 'days'))).toBe('1wk ago')
        })

        test('14-20 days difference as 2wk ago', async () => {
            const now = dayjs()
            expect(now.to(now.subtract(14, 'days'))).toBe('2wk ago')
            expect(now.to(now.subtract(20, 'days'))).toBe('2wk ago')
        })

        test('21-27 days difference as 3wk ago', async () => {
            const now = dayjs()
            expect(now.to(now.subtract(21, 'days'))).toBe('3wk ago')
            expect(now.to(now.subtract(27, 'days'))).toBe('3wk ago')
        })

        test('28-59 days difference as 1mo ago', async () => {
            const now = dayjs()
            expect(now.to(now.subtract(28, 'days'))).toBe('1mo ago')
            expect(now.to(now.subtract(59, 'days'))).toBe('1mo ago')
        })

        test('2-11 months difference as 2-11mo ago', async () => {
            const now = dayjs()
            expect(now.to(now.subtract(2, 'months'))).toBe('2mo ago')
            expect(now.to(now.subtract(11, 'months'))).toBe('11mo ago')
        })

        test('12-23 months difference as 1yr ago', async () => {
            const now = dayjs()
            expect(now.to(now.subtract(12, 'months'))).toBe('1yr ago')
            expect(now.to(now.subtract(23, 'months'))).toBe('1yr ago')
        })

        test('2+ years difference as 2+yr ago', async () => {
            const now = dayjs()
            expect(now.to(now.subtract(2, 'years'))).toBe('2yr ago')
            expect(now.to(now.subtract(10, 'years'))).toBe('10yr ago')
        })
    })
})
