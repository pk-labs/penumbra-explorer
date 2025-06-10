import { getByText, render } from '@testing-library/react'
import View from './view'

describe('View', () => {
    test('renders title and children', async () => {
        const { container } = render(<View title="Foo">Bar</View>)

        getByText(container, 'Foo')
        getByText(container, 'Bar')
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
