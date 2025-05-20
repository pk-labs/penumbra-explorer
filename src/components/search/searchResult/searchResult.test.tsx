import { getByText, render } from '@testing-library/react'
import SearchResult from './searchResult'

describe('SearchResult', () => {
    test('renders block', async () => {
        const { container } = render(
            <SearchResult searchResult={{ height: 1234567, type: 'block' }} />
        )

        expect(getByText(container, '1,234,567')).toHaveAttribute(
            'href',
            '/block/1234567'
        )
    })

    test('renders transaction', async () => {
        const { container } = render(
            <SearchResult searchResult={{ hash: 'foo', type: 'transaction' }} />
        )

        expect(getByText(container, 'foo')).toHaveAttribute('href', '/tx/foo')
    })

    test('renders client', async () => {
        const { container } = render(
            <SearchResult
                searchResult={{ id: '07-tendermint-0', type: 'client' }}
            />
        )

        expect(getByText(container, 'Cosmos Hub')).toHaveAttribute(
            'href',
            '/ibc/cosmoshub'
        )
    })

    test('renders nothing when client not found', async () => {
        const { container } = render(
            <SearchResult searchResult={{ id: 'foo', type: 'client' }} />
        )

        expect(container.firstChild).toBeNull()
    })
})
