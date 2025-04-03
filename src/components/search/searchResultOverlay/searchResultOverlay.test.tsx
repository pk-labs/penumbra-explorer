import { getByText, render } from '@testing-library/react'
import { SearchResult } from '../searchResult'
import SearchResultOverlay from './searchResultOverlay'

describe('SearchResultOverlay', () => {
    test('renders title', async () => {
        const { container } = render(<SearchResultOverlay title="Foo" />)
        getByText(container, 'Foo')
    })

    test('renders children', async () => {
        const { container } = render(
            <SearchResultOverlay>
                <SearchResult heightOrHash={123} />
            </SearchResultOverlay>
        )

        getByText(container, '123')
    })
})
