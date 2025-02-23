import { getByText, render } from '@testing-library/react'
import Subsection from './subsection'

describe('Subsection', () => {
    test('renders title', async () => {
        const { container } = render(<Subsection title="Foo">Bar</Subsection>)

        getByText(container, 'Foo')
        getByText(container, 'Bar')
    })

    test('applies custom classes', async () => {
        const { container } = render(<Subsection className="foo bar" />)

        expect(container.firstElementChild?.classList.contains('foo')).toBe(
            true
        )

        expect(container.firstElementChild?.classList.contains('bar')).toBe(
            true
        )
    })
})
