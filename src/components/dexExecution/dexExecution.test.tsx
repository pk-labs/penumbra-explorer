import { getByText, render } from '@testing-library/react'
import DexExecution from './dexExecution'

describe('DexExecution', () => {
    test('renders base and quote', async () => {
        const { container } = render(
            <DexExecution
                base="BTC"
                baseAmount={1234}
                quote="USD"
                quoteAmount={5678}
                swaps={0}
            />
        )

        getByText(container, '1,234 BTC', { exact: false })
        getByText(container, '5,678 USD', { exact: false })
    })

    test('renders single swap', async () => {
        const { container } = render(
            <DexExecution
                base="BTC"
                baseAmount={0}
                quote="USD"
                quoteAmount={0}
                swaps={1}
            />
        )

        getByText(container, '1 swap')
    })

    test('renders multiple swaps', async () => {
        const { container } = render(
            <DexExecution
                base="BTC"
                baseAmount={0}
                quote="USD"
                quoteAmount={0}
                swaps={2}
            />
        )

        getByText(container, '2 swaps')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <DexExecution
                base="BTC"
                baseAmount={0}
                className="foo bar"
                quote="USD"
                quoteAmount={0}
                swaps={0}
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
