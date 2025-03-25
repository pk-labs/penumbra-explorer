import { getByText, render } from '@testing-library/react'
import SearchResult from './searchResult'

describe('SearchResult', () => {
    test('renders block result', async () => {
        const { container } = render(<SearchResult heightOrHash={1234567} />)

        expect(getByText(container, '1,234,567')).toHaveAttribute(
            'href',
            '/block/1234567'
        )
    })

    test('renders transaction result', async () => {
        const { container } = render(<SearchResult heightOrHash="foo" />)
        expect(getByText(container, 'foo')).toHaveAttribute('href', '/tx/foo')
    })
})
