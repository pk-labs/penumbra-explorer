import {
    getByPlaceholderText,
    queryByText,
    render,
} from '@testing-library/react'
import Search from './search'
import { SearchResultProps } from './searchResult'
import { SearchResultOverlayProps } from './searchResultOverlay'

jest.mock('urql', () => ({
    useClient: () => ({
        query: jest.fn(),
    }),
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

        getByPlaceholderText(
            container,
            'Search by block height or transaction hash'
        )

        expect(queryByText(container, 'SearchResultOverlay')).toBeNull()
    })

    test('applies CSS classes', async () => {
        const { container } = render(<Search className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
