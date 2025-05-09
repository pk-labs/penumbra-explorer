import generatePageMetadata from './generatePageMetadata'

describe('generatePageMetadata', () => {
    test('generates full title', async () => {
        expect(generatePageMetadata('Foo', 'Bar', '/foo')).toMatchObject({
            title: 'Foo - Penumbra Blockchain Explorer',
        })
    })

    test('generates canonical URL', async () => {
        expect(generatePageMetadata('Foo', 'Bar', '/foo')).toMatchObject({
            alternates: {
                canonical: `${process.env.BASE_URL}/foo`,
            },
        })
    })
})
