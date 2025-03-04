import { fireEvent, getByText, render } from '@testing-library/react'
import Modal from './modal'

describe('Modal', () => {
    test('renders nothing when not open', async () => {
        const { container } = render(<Modal>Foo</Modal>)
        expect(container.firstChild).toBeNull()
    })

    test('renders children when open', async () => {
        const { container } = render(<Modal open>Foo</Modal>)
        getByText(container, 'Foo')
    })

    test('renders close button and invokes callback', async () => {
        const onClose = jest.fn()
        const { container } = render(<Modal onClose={onClose} open />)

        const closeButton = container.querySelector('button')

        if (!closeButton) {
            throw Error('Missing element')
        }

        fireEvent.click(closeButton)
        expect(onClose).toHaveBeenCalled()
    })

    test('applies custom classes', async () => {
        const { container } = render(<Modal className="foo bar" open />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
