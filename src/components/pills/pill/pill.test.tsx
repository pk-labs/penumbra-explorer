import { render } from '@testing-library/react'
import Pill from './pill'

describe('Pill', () => {
    test('applies CSS classes', async () => {
        const { container } = render(<Pill className="foo bar">Foo</Pill>)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
