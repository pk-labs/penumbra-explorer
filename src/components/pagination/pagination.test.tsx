import { render } from '@testing-library/react'
import Pagination from './pagination'

describe('Pagination', () => {
    test('applies custom classes', async () => {
        const { container } = render(<Pagination className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
