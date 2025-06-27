import { render } from '@testing-library/react'
import ViewNavigation from './viewNavigation'

describe('ViewNavigation', () => {
    test('renders buttons disabled by default', async () => {
        const { container } = render(<ViewNavigation />)

        const prevButton = container.firstChild?.firstChild?.firstChild
        const nextButton = container.firstChild?.lastChild?.firstChild

        expect(prevButton).toBeDisabled()
        expect(nextButton).toBeDisabled()
    })

    test('renders buttons as links', async () => {
        const { container } = render(
            <ViewNavigation nextHref="/bar" prevHref="/foo" />
        )

        const prevButton = container.firstChild?.firstChild?.firstChild
        const nextButton = container.firstChild?.lastChild?.firstChild

        expect(prevButton).toBeEnabled()
        expect(prevButton?.parentNode).toHaveAttribute('href', '/foo')

        expect(nextButton).toBeEnabled()
        expect(nextButton?.parentNode).toHaveAttribute('href', '/bar')
    })

    test('applies CSS classes', async () => {
        const { container } = render(<ViewNavigation className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
