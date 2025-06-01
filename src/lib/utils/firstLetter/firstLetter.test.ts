import firstLetter from './firstLetter'

describe('firstLetter', () => {
    test('returns empty string when no letter found', async () => {
        expect(firstLetter('⭐')).toBe('')
    })

    test('returns first letter ignoring unicode icons', async () => {
        expect(firstLetter('⭐ Foo')).toBe('F')
    })
})
