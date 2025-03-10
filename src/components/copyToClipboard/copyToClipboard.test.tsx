import {
    act,
    fireEvent,
    getByText,
    render,
    waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CopyToClipboard from './copyToClipboard'

userEvent.setup()
window.alert = jest.fn()

jest.mock('lucide-react', () => ({
    Check: () => <span>Check</span>,
    Copy: () => <span>Copy</span>,
}))

describe('CopyToClipboard', () => {
    test('writes data to clipboard on click', async () => {
        const { container } = render(<CopyToClipboard data="foo" />)

        fireEvent.click(getByText(container, 'Copy'))

        await waitFor(async () => {
            const clipboardText = await navigator.clipboard.readText()
            expect(clipboardText).toBe('foo')
        })
    })

    test('renders check icon for 3 seconds after copying', async () => {
        const { container } = render(<CopyToClipboard data="foo" />)

        fireEvent.click(getByText(container, 'Copy'))
        await waitFor(() => getByText(container, 'Check'))

        act(() => jest.advanceTimersByTime(3000))
        getByText(container, 'Copy')
    })

    test('renders small variant', async () => {
        const { container } = render(<CopyToClipboard data="foo" small />)
        expect(container.firstChild).toHaveClass('small')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <CopyToClipboard className="foo bar" data="foo" />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
