import { queryByText, render } from '@testing-library/react'
import BlockView from './blockView'

describe('BlockView', () => {
    test('renders navigation', async () => {
        const { container } = render(
            <BlockView
                block={{ height: 1234567, timestamp: 0, transactions: [] }}
            />
        )

        const navigation = queryByText(container, 'Block view')?.nextSibling

        expect(navigation?.firstChild).toHaveAttribute('href', '/block/1234568')
        expect(navigation?.lastChild).toHaveAttribute('href', '/block/1234566')
    })

    test('disables next button when viewing first block', async () => {
        const { container } = render(
            <BlockView block={{ height: 1, timestamp: 0, transactions: [] }} />
        )

        const navigation = queryByText(container, 'Block view')?.nextSibling

        expect(navigation?.firstChild).toHaveAttribute('href', '/block/2')
        expect(navigation?.lastChild).not.toHaveAttribute('href')
        expect(navigation?.lastChild?.firstChild).toBeDisabled()
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <BlockView
                block={{ height: 1234567, timestamp: 0, transactions: [] }}
                className="foo bar"
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
