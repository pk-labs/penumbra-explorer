import { getByText, render } from '@testing-library/react'
import View from './view'

describe('View', () => {
    test('renders children, title and subtitle', async () => {
        const { container } = render(
            <View subtitle="Bar" title="Foo">
                Baz
            </View>
        )

        getByText(container, 'Foo')
        getByText(container, 'Bar')
        getByText(container, 'Baz')
    })

    test('renders any node as subtitle ', async () => {
        const { container } = render(<View subtitle={123} title="Foo" />)
        getByText(container, 123)
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <View className="foo bar" title="Foo">
                Bar
            </View>
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
