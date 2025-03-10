import { fireEvent, getByText, render } from '@testing-library/react'
import { usePathname } from '@/lib/__tests__/__mocks__'
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

    describe('closes', () => {
        test('when clicking close button', async () => {
            const onClose = jest.fn()
            const { container } = render(<Modal onClose={onClose} open />)

            const closeButton = container.querySelector('button')

            if (!closeButton) {
                throw Error('Missing element')
            }

            fireEvent.click(closeButton)
            expect(onClose).toHaveBeenCalled()
        })

        test('when clicking backdrop', async () => {
            const onClose = jest.fn()
            const { container } = render(<Modal onClose={onClose} open />)

            const backdrop = container.firstChild

            if (!backdrop) {
                throw Error('Missing element')
            }

            fireEvent.click(backdrop)
            expect(onClose).toHaveBeenCalled()
        })

        test('when pressing escape', async () => {
            const onClose = jest.fn()
            const { container } = render(<Modal onClose={onClose} open />)

            fireEvent.keyDown(container, { key: 'Enter' })
            expect(onClose).not.toHaveBeenCalled()

            fireEvent.keyDown(container, { key: 'Escape' })
            expect(onClose).toHaveBeenCalled()
        })

        test('when pathname changes', async () => {
            const onClose = jest.fn()
            const { rerender } = render(<Modal onClose={onClose} open />)

            expect(onClose).not.toHaveBeenCalled()

            usePathname.mockReturnValueOnce('/foo')
            rerender(<Modal onClose={onClose} open />)

            expect(onClose).toHaveBeenCalled()
        })
    })

    test('applies CSS classes', async () => {
        const { container } = render(<Modal className="foo bar" open />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
