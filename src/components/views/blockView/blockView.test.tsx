import { getByText, queryByText, render } from '@testing-library/react'
import BlockView from './blockView'

jest.mock(
    '../../tables/transactionTable/transactionTable',
    () => (props: any) => <div>{props.transactions}</div>
)

jest.mock('../../dexSwapExecution/dexSwapExecution', () => (props: any) => (
    <div>{props.id}</div>
))

describe('BlockView', () => {
    test.skip('renders navigation', async () => {
        const { container } = render(
            <BlockView
                block={{ height: 1234567, timestamp: 0, transactions: [] }}
                swapExecutions={[]}
            />
        )

        const navigation = queryByText(container, 'Block view')?.nextSibling

        expect(navigation?.firstChild).toHaveAttribute('href', '/block/1234568')
        expect(navigation?.lastChild).toHaveAttribute('href', '/block/1234566')
    })

    test.skip('disables next button when viewing first block', async () => {
        const { container } = render(
            <BlockView
                block={{ height: 1, timestamp: 0, transactions: [] }}
                swapExecutions={[]}
            />
        )

        const navigation = queryByText(container, 'Block view')?.nextSibling

        expect(navigation?.firstChild).toHaveAttribute('href', '/block/2')
        expect(navigation?.lastChild).not.toHaveAttribute('href')
        expect(navigation?.lastChild?.firstChild).toBeDisabled()
    })

    test('renders block height', async () => {
        const { container } = render(
            <BlockView
                block={{ height: 1234567, timestamp: 0, transactions: [] }}
                swapExecutions={[]}
            />
        )

        getByText(container, '1,234,567')
    })

    test('renders timestamp height', async () => {
        const { container } = render(
            <BlockView
                block={{ height: 1234567, timestamp: 0, transactions: [] }}
                swapExecutions={[]}
            />
        )

        getByText(container, '1970-01-01 00:00:00 UTC')
    })

    test('renders transactions', async () => {
        const { container } = render(
            <BlockView
                // @ts-expect-error
                block={{ height: 1234567, timestamp: 0, transactions: 'Foo' }}
                swapExecutions={[]}
            />
        )

        getByText(container, 'Foo')
    })

    test('renders swap executions', async () => {
        const { container } = render(
            <BlockView
                block={{ height: 1234567, timestamp: 0, transactions: [] }}
                // @ts-expect-error
                swapExecutions={[{ id: 'foo' }]}
            />
        )

        getByText(container, 'Executions')
        getByText(container, 'foo')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <BlockView
                block={{ height: 1234567, timestamp: 0, transactions: [] }}
                className="foo bar"
                swapExecutions={[]}
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
