import { render } from '@testing-library/react'
import CopyToClipboard from './copyToClipboard'

describe('CopyToClipboard', () => {
    test('renders at default size', async () => {
        const { container } = render(<CopyToClipboard text="foo" />)
        expect(container.firstChild).toHaveClass('w-8', 'h-8')
    })

    test('renders at small size', async () => {
        const { container } = render(<CopyToClipboard text="foo" small />)
        expect(container.firstChild).toHaveClass('w-6', 'h-6')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <CopyToClipboard className="foo bar" text="foo" />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
