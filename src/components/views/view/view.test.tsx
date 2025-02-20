import { getByText, render } from '@testing-library/react'
import View from './view'

describe('View', () => {
    test('renders children, title and subtitle', async () => {
        const { container } = render(
            <View subtitle="Baz" title="Bar">
                Foo
            </View>
        )

        getByText(container, 'Foo')
        getByText(container, 'Bar')
        getByText(container, 'Baz')
    })

    test('applies custom classes', async () => {
        const { container } = render(
            <View className="foo" subtitle="Baz" title="Bar">
                Foo
            </View>
        )

        expect(getByText(container, 'Foo').classList.contains('foo')).toBe(true)
    })
})
