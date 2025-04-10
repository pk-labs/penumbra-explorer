import { render } from '@testing-library/react'
import Skeleton from './skeleton'

describe('Skeleton', () => {
    test('applies CSS classes', async () => {
        const { container } = render(<Skeleton className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
