import { render } from '@testing-library/react'
import Footer from './footer'

describe('Footer', () => {
    test('applies CSS classes', async () => {
        const { container } = render(<Footer className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
