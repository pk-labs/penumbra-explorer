import { getByText, render } from '@testing-library/react'
import Pill from './pill'

describe('Pill', () => {
    test('renders children', async () => {
        const { container } = render(<Pill>Foo</Pill>)
        getByText(container, 'Foo')
    })

    test('renders compact variant', async () => {
        const { container } = render(<Pill compact />)
        expect(container.firstChild).toHaveClass('py-1')
    })

    test('renders technical variant', async () => {
        const { container } = render(<Pill technical />)
        expect(container.firstChild).toHaveClass('font-mono')
    })

    describe('renders primary variant', () => {
        test('in default context', async () => {
            const { container } = render(
                <Pill context="default" priority="primary" />
            )

            expect(container.firstChild).toHaveClass(
                'text-text-primary',
                'bg-other-tonal-fill10'
            )
        })

        test('in success context', async () => {
            const { container } = render(
                <Pill context="success" priority="primary" />
            )

            expect(container.firstChild).toHaveClass(
                'text-secondary-dark',
                'bg-success-light'
            )
        })

        test('in caution context', async () => {
            const { container } = render(
                <Pill context="caution" priority="primary" />
            )

            expect(container.firstChild).toHaveClass(
                'text-secondary-dark',
                'bg-caution-light'
            )
        })

        test('in destructive context', async () => {
            const { container } = render(
                <Pill context="destructive" priority="primary" />
            )

            expect(container.firstChild).toHaveClass(
                'text-secondary-dark',
                'bg-destructive-light'
            )
        })
    })

    test('renders secondary variant', async () => {
        const { container } = render(<Pill priority="secondary" />)

        expect(container.firstChild).toHaveClass(
            'border-other-tonal-stroke',
            'border-2',
            'border-dashed'
        )
    })

    describe('renders secondary variant', () => {
        test('in default context', async () => {
            const { container } = render(
                <Pill context="default" priority="secondary" />
            )

            expect(container.firstChild).toHaveClass(
                'text-text-primary',
                'bg-transparent'
            )
        })

        test('in success context', async () => {
            const { container } = render(
                <Pill context="success" priority="secondary" />
            )

            expect(container.firstChild).toHaveClass(
                'text-success-light',
                'bg-transparent'
            )
        })

        test('in caution context', async () => {
            const { container } = render(
                <Pill context="caution" priority="secondary" />
            )

            expect(container.firstChild).toHaveClass(
                'text-caution-light',
                'bg-transparent'
            )
        })

        test('in destructive context', async () => {
            const { container } = render(
                <Pill context="destructive" priority="secondary" />
            )

            expect(container.firstChild).toHaveClass(
                'text-destructive-light',
                'bg-transparent'
            )
        })
    })

    test('applies CSS classes', async () => {
        const { container } = render(<Pill className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
