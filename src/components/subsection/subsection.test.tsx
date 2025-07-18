import { getByText, render } from '@testing-library/react'
import Subsection from './subsection'

describe('Subsection', () => {
    test('renders title', async () => {
        const { container } = render(<Subsection title="Foo">Bar</Subsection>)

        getByText(container, 'Foo')
        getByText(container, 'Bar')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <Subsection className="foo bar" title="Bar" titleClassName="bar" />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
        expect(getByText(container, 'Bar')).toHaveClass('bar')
    })
})
