import { fireEvent, getByText, render } from '@testing-library/react'
import { router, useSearchParams } from '@/lib/__tests__/__mocks__'
import FilterSelector from './filterSelector'

describe('FilterSelector', () => {
    describe('renders nothing', () => {
        test('when no filters', async () => {
            const { container } = render(<FilterSelector filters={[]} />)
            expect(container.firstChild).toBeNull()
        })

        test('when no matching filter selected', async () => {
            const { container } = render(
                <FilterSelector filters={['bar']} selectedFilter="foo" />
            )

            expect(container.firstChild).toBeNull()
        })
    })

    test('selects first filter by default', async () => {
        const { container } = render(
            <FilterSelector filters={['foo', 'bar']} />
        )

        expect(getByText(container, 'foo')).toHaveClass('active')
    })

    describe('updates search param on change', () => {
        const mockImplementation = useSearchParams.getMockImplementation()

        afterEach(() => useSearchParams.mockImplementation(mockImplementation))

        test('without existing search params', async () => {
            const { container, rerender } = render(
                <FilterSelector filters={['foo', 'bar']} />
            )

            fireEvent.click(getByText(container, 'foo'))
            expect(router.push).not.toHaveBeenCalled()

            fireEvent.click(getByText(container, 'bar'))
            expect(router.push).toHaveBeenCalledWith('/?filter=bar')

            rerender(
                <FilterSelector filters={['foo', 'bar']} selectedFilter="bar" />
            )

            fireEvent.click(getByText(container, 'foo'))
            expect(router.push).toHaveBeenCalledWith('/')
        })
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <FilterSelector className="foo bar" filters={['foo']} />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
