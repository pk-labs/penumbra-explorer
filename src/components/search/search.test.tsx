import { render } from '@testing-library/react'
import Search from './search'

describe('Search', () => {
    test('applies custom classes', async () => {
        const { container } = render(<Search className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
