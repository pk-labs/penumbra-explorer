import { getByText, render } from '@testing-library/react'
import Pagination from './pagination'

describe('Pagination', () => {
    test('has disabled pagination buttons by default', async () => {
        const { container } = render(<Pagination />)

        expect(getByText(container, 'Prev')).toBeDisabled()
        expect(getByText(container, 'Next')).toBeDisabled()
    })

    test('prev button links to previous page', async () => {
        const { container } = render(<Pagination fromPrev="foo" />)

        const button = getByText(container, 'Prev')
        expect(button).toBeEnabled()
        expect(button.parentNode).toHaveAttribute('href', '/?from=foo')
    })

    test('net button links to next page', async () => {
        const { container } = render(<Pagination fromNext="foo" />)

        const button = getByText(container, 'Next')
        expect(button).toBeEnabled()
        expect(button.parentNode).toHaveAttribute('href', '/?from=foo')
    })

    test('applies CSS classes', async () => {
        const { container } = render(<Pagination className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
