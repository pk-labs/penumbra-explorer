import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LucideProps } from 'lucide-react'
import CopyToClipboard from './copyToClipboard'

userEvent.setup()
window.alert = jest.fn()

jest.mock('lucide-react', () => ({
    Copy: (props: LucideProps) => (
        <svg
            className={props.className}
            onClick={props.onClick}
            width={props.size}
        />
    ),
}))

describe('CopyToClipboard', () => {
    test('writes data to clipboard on click', async () => {
        const { container } = render(<CopyToClipboard data="foo" />)

        if (!container.firstChild) {
            throw Error('Missing element')
        }

        fireEvent.click(container.firstChild)

        const clipboardText = await navigator.clipboard.readText()
        expect(clipboardText).toBe('foo')
    })

    test('applies icon size', async () => {
        const { container } = render(
            <CopyToClipboard data="foo" iconSize={99} />
        )

        expect(container.firstChild).toHaveAttribute('width', '99')
    })

    test('applies custom classes', async () => {
        const { container } = render(
            <CopyToClipboard className="foo bar" data="foo" />
        )

        expect(container.firstElementChild?.classList.contains('foo')).toBe(
            true
        )

        expect(container.firstElementChild?.classList.contains('bar')).toBe(
            true
        )
    })
})
