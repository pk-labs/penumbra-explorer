import classNames from './classNames'

describe('classNames', () => {
    test('conditionally constructs className using clsx', async () => {
        const class1 = true
        const class2 = false
        const class3 = true

        expect(
            classNames(
                class1 && 'class-1',
                class2 && 'class-2',
                class3 && 'class-3'
            )
        ).toBe('class-1 class-3')
    })

    test('merges Tailwind classes with tailwind-merge', async () => {
        expect(classNames('p-1', 'p-2', 'p-3')).toBe('p-3')
    })
})
