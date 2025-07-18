import { getByText, render } from '@testing-library/react'
import UmPrice from './umPrice'

describe('UmPrice', () => {
    describe('renders nothing', () => {
        test('when price is null', async () => {
            const { container } = render(
                <UmPrice change={1.234} price={null} />
            )

            expect(container.firstChild).toBeNull()
        })

        test('when change is null', async () => {
            const { container } = render(<UmPrice change={null} price={9999} />)

            expect(container.firstChild).toBeNull()
        })
    })

    test('renders positive change', async () => {
        const { container } = render(<UmPrice change={1.234} price={9999} />)

        getByText(container, '$9999.00')

        expect(getByText(container, '(+1.2%)')).toHaveClass(
            'text-success-light'
        )
    })

    test('renders negative change', async () => {
        const { container } = render(<UmPrice change={-1.234} price={9.991} />)

        getByText(container, '$9.99')

        expect(getByText(container, '(-1.2%)')).toHaveClass(
            'text-destructive-light'
        )
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <UmPrice change={0} className="foo bar" price={0} />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
