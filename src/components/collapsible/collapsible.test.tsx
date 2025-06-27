import {
    fireEvent,
    getByText,
    queryByText,
    render,
    waitFor,
} from '@testing-library/react'
import Collapsible from './collapsible'

describe('Collapsible', () => {
    test('renders collapsed by default', async () => {
        const { container } = render(
            <Collapsible header="Foo">Bar</Collapsible>
        )

        getByText(container, 'Foo')
        expect(queryByText(container, 'Bar')).toBeNull()
    })

    test('toggles content on header click', async () => {
        const { container } = render(
            <Collapsible header="Foo">Bar</Collapsible>
        )

        fireEvent.click(getByText(container, 'Foo'))

        await waitFor(() => {
            getByText(container, 'Bar')
        })

        fireEvent.click(getByText(container, 'Foo'))

        await waitFor(() => {
            expect(queryByText(container, 'Bar')).toBeNull()
        })
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <Collapsible
                className="root"
                contentClassName="bar"
                header="Foo"
                headerClassName="foo"
            >
                Bar
            </Collapsible>
        )

        const header = getByText(container, 'Foo')

        fireEvent.click(header)

        expect(container.firstChild).toHaveClass('root')
        expect(header).toHaveClass('foo')
        expect(getByText(container, 'Bar')).toHaveClass('bar')
    })
})
