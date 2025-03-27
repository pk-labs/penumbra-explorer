import {
    act,
    fireEvent,
    getByPlaceholderText,
    getByText,
    queryByText,
    render,
} from '@testing-library/react'
import { useClient } from 'urql'
import Search from './search'
import { SearchResultProps } from './searchResult'
import { SearchResultOverlayProps } from './searchResultOverlay'

jest.mock('urql', () => ({
    useClient: () => ({
        query: jest.fn(() => ({
            toPromise: () => Promise.resolve({}),
        })),
    }),
}))

jest.mock('motion/react', () => ({
    AnimatePresence: (props: any) => <div>{props.children}</div>,
}))

jest.mock(
    './searchResultOverlay/searchResultOverlay',
    () => (props: SearchResultOverlayProps) => (
        <div>
            <div>SearchResultOverlay</div>
            {props.children}
        </div>
    )
)

jest.mock('./searchResult/searchResult', () => (props: SearchResultProps) => (
    <div>{props.heightOrHash}</div>
))

describe('Search', () => {
    test('is not focused by default', async () => {
        const { container } = render(<Search />)

        expect(
            getByPlaceholderText(
                container,
                'Search by block height or transaction hash'
            )
        ).not.toHaveFocus()
    })

    test('autofocuses when flag set', async () => {
        const { container } = render(<Search autoFocus />)

        expect(
            getByPlaceholderText(
                container,
                'Search by block height or transaction hash'
            )
        ).toHaveFocus()
    })

    test('renders search result overlay when focused', async () => {
        const { container } = render(<Search />)

        fireEvent.focus(
            getByPlaceholderText(
                container,
                'Search by block height or transaction hash'
            )
        )

        queryByText(container, 'SearchResultOverlay')
    })

    test('invokes callback on blur', async () => {
        const onBlur = jest.fn()
        const { container } = render(<Search onBlur={onBlur} />)

        fireEvent.blur(
            getByPlaceholderText(
                container,
                'Search by block height or transaction hash'
            )
        )

        expect(onBlur).toHaveBeenCalled()
    })

    test('renders recent search results', async () => {
        window.localStorage.setItem('search', JSON.stringify([123, 'foo']))

        const { container } = render(<Search />)

        fireEvent.focus(
            getByPlaceholderText(
                container,
                'Search by block height or transaction hash'
            )
        )

        getByText(container, 'SearchResultOverlay')
        getByText(container, 123)
        getByText(container, 'foo')
    })

    test.skip('executes debounced search query on input change', async () => {
        const { container } = render(<Search />)

        fireEvent.change(
            getByPlaceholderText(
                container,
                'Search by block height or transaction hash'
            ),
            { currentTarget: { value: 'foo' } }
        )

        const graphqlClient = useClient()
        expect(graphqlClient.query).not.toHaveBeenCalled()

        act(() => jest.runAllTimers())

        // FIXME: Not called
        expect(graphqlClient.query).toHaveBeenCalled()
    })

    test('applies CSS classes', async () => {
        const { container } = render(<Search className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
