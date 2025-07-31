import { getByText, render } from '@testing-library/react'
import dayjs from '@/lib/dayjs'
import DexBlockExecution from './dexBlockExecution'

describe('DexBlockExecution', () => {
    test('renders block height and timestamp', async () => {
        const { container } = render(
            <DexBlockExecution
                height={1234}
                swapExecutions={[]}
                timestamp={dayjs().subtract(1.1, 'second').valueOf()}
            />
        )

        getByText(container, 'Block 1,234')
        getByText(container, '1s ago')
    })

    test.skip('renders swap executions', async () => {
        const { container } = render(
            <DexBlockExecution
                height={0}
                swapExecutions={[
                    {
                        baseAmount: 1234,
                        baseAssetId: 'foo',
                        id: 1,
                        quoteAmount: 5678,
                        quoteAssetId: 'bar',
                        routes: [],
                    },
                ]}
                timestamp={0}
            />
        )

        getByText(container, '1,234 BTC', { exact: false })
        getByText(container, '5,678 USD', { exact: false })
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <DexBlockExecution
                className="foo bar"
                height={0}
                swapExecutions={[]}
                timestamp={0}
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
