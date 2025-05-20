import { fireEvent, getByText, render } from '@testing-library/react'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { router, useSearchParams } from '@/lib/__tests__/__mocks__'
import TimePeriodSelector from './timePeriodSelector'

describe('TimePeriodSelector', () => {
    test('has day selected by default', async () => {
        const { container } = render(<TimePeriodSelector />)
        expect(getByText(container, '24h')).toHaveClass('active')
    })

    describe('updates search param on change', () => {
        const mockImplementation = useSearchParams.getMockImplementation()

        afterEach(() => useSearchParams.mockImplementation(mockImplementation))

        test('with existing search params', async () => {
            useSearchParams.mockReturnValue(
                new ReadonlyURLSearchParams({ foo: 'bar' })
            )

            const { container } = render(<TimePeriodSelector />)

            fireEvent.click(getByText(container, '30d'))
            expect(router.push).toHaveBeenCalledWith('/?foo=bar&period=30d')

            fireEvent.click(getByText(container, 'All'))
            expect(router.push).toHaveBeenCalledWith('/?foo=bar&period=all')

            // TODO: Enable once size is supported in jsdom:
            // https://github.com/jsdom/jsdom/issues/3604
            // fireEvent.click(getByText(container, '24h'))
            // expect(router.push).toHaveBeenCalledWith('/?foo=bar')
        })

        test('without existing search params', async () => {
            const { container } = render(<TimePeriodSelector />)

            fireEvent.click(getByText(container, '30d'))
            expect(router.push).toHaveBeenCalledWith('/?period=30d')

            fireEvent.click(getByText(container, 'All'))
            expect(router.push).toHaveBeenCalledWith('/?period=all')

            fireEvent.click(getByText(container, '24h'))
            expect(router.push).toHaveBeenCalledWith('/')
        })
    })

    test('applies CSS classes', async () => {
        const { container } = render(<TimePeriodSelector className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
