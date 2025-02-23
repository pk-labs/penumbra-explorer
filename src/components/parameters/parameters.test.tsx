import { getByText, render } from '@testing-library/react'
import { Parameter } from './parameter'
import Parameters from './parameters'

describe('Parameters', () => {
    test('renders children', async () => {
        const { container } = render(
            <Parameters>
                <Parameter name="Foo">Bar</Parameter>
            </Parameters>
        )

        getByText(container, 'Foo')
        getByText(container, 'Bar')
    })

    test('applies custom classes', async () => {
        const { container } = render(<Parameters className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
