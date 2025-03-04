import { getByText, render } from '@testing-library/react'
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

    test('applies custom classes', async () => {
        const { container } = render(<Modal className="foo bar" open />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
