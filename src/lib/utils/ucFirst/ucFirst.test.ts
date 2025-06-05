import ucFirst from './ucFirst'

describe('ucFirst', () => {
    test('returns empty string when no string or empty', async () => {
        expect(ucFirst()).toBe('')
        expect(ucFirst('')).toBe('')
    })

    test('returns lower case string starting with upper case letter', async () => {
        expect(ucFirst('foobar')).toBe('Foobar')
        expect(ucFirst('fooBar')).toBe('Foobar')
        expect(ucFirst('FOOBAR')).toBe('Foobar')
        expect(ucFirst('fO')).toBe('Fo')
        expect(ucFirst('f')).toBe('F')
    })
})
