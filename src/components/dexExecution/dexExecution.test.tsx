import { getByText, render } from '@testing-library/react'
import DexExecution from './dexExecution'

describe('DexExecution', () => {
    // test('renders base and quote', async () => {
    //     const { container } = render(
    //         <DexExecution
    //             base="BTC"
    //             baseAmount={1234}
    //             id="1"
    //             quote="USD"
    //             quoteAmount={5678}
    //             swaps={[]}
    //         />
    //     )
    //
    //     getByText(container, '1,234 BTC', { exact: false })
    //     getByText(container, '5,678 USD', { exact: false })
    // })

    test('renders single swap', async () => {
        const { container } = render(
            <DexExecution
                baseAmount={0}
                baseAssetId="foo"
                id="1"
                quoteAmount={0}
                quoteAssetId="bar"
                swaps={[[]]}
            />
        )

        getByText(container, '1 swap')
    })

    test('renders multiple swaps', async () => {
        const { container } = render(
            <DexExecution
                baseAmount={0}
                baseAssetId="foo"
                id="1"
                quoteAmount={0}
                quoteAssetId="bar"
                swaps={[[], []]}
            />
        )

        getByText(container, '2 swaps')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <DexExecution
                baseAmount={0}
                baseAssetId="foo"
                className="foo bar"
                id="1"
                quoteAmount={0}
                quoteAssetId="bar"
                swaps={[]}
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
