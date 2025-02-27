import { fireEvent, getByText, render } from '@testing-library/react'
import { router } from '@/lib/__tests__/__mocks__'
import Pagination from './pagination'

describe('Pagination', () => {
    test('has disabled pagination buttons by default', async () => {
        const { container } = render(<Pagination />)

        expect(getByText(container, 'Prev')).toBeDisabled()
        expect(getByText(container, 'Next')).toBeDisabled()
    })

    test('prev button updates from param', async () => {
        const { container } = render(<Pagination fromPrev="foo" />)

        fireEvent.click(getByText(container, 'Prev'))
        expect(router.push).toHaveBeenCalledWith('/?from=foo')
    })

    test('next button updates from param', async () => {
        const { container } = render(<Pagination fromNext="foo" />)

        fireEvent.click(getByText(container, 'Next'))
        expect(router.push).toHaveBeenCalledWith('/?from=foo')
    })

    test('applies custom classes', async () => {
        const { container } = render(<Pagination className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
