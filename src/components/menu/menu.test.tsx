import {
    fireEvent,
    getByText,
    queryByText,
    render,
} from '@testing-library/react'
import Menu from './menu'
import { MenuItem, MenuItemProps } from './menuItem'

jest.mock('./menuItem/menuItem', () => (props: MenuItemProps) => (
    <div>{props.children}</div>
))

describe('Menu', () => {
    describe('when closed', () => {
        test('does not render menu items', async () => {
            const { container } = render(
                <Menu onClose={jest.fn()} onOpen={jest.fn()} open={false}>
                    <MenuItem href="/foo">Foo</MenuItem>
                    <MenuItem href="/bar">Bar</MenuItem>
                </Menu>
            )

            expect(queryByText(container, 'Foo')).toBeNull()
            expect(queryByText(container, 'Bar')).toBeNull()
        })

        describe('button', () => {
            test('has menu icon', async () => {
                const { container } = render(
                    <Menu onClose={jest.fn()} onOpen={jest.fn()} open={false} />
                )

                const icon = container.firstChild?.firstChild?.firstChild
                expect(icon).toHaveClass('lucide-menu')
            })

            test('invokes open callback', async () => {
                const onOpen = jest.fn()

                const { container } = render(
                    <Menu onClose={jest.fn()} onOpen={onOpen} open={false} />
                )

                const button = container.firstChild?.firstChild

                if (!button) {
                    throw Error('Missing element')
                }

                fireEvent.click(button)

                expect(onOpen).toHaveBeenCalled()
            })
        })
    })

    describe('when closed', () => {
        test('renders menu items', async () => {
            const { container } = render(
                <Menu onClose={jest.fn()} onOpen={jest.fn()} open>
                    <MenuItem href="/foo">Foo</MenuItem>
                    <MenuItem href="/bar">Bar</MenuItem>
                </Menu>
            )

            getByText(container, 'Foo')
            getByText(container, 'Bar')
        })

        describe('button', () => {
            test('has close icon', async () => {
                const { container } = render(
                    <Menu onClose={jest.fn()} onOpen={jest.fn()} open />
                )

                const icon = container.firstChild?.firstChild?.firstChild
                expect(icon).toHaveClass('lucide-x')
            })

            test('invokes close callback', async () => {
                const onClose = jest.fn()

                const { container } = render(
                    <Menu onClose={onClose} onOpen={jest.fn()} open />
                )

                const button = container.firstChild?.firstChild

                if (!button) {
                    throw Error('Missing element')
                }

                fireEvent.click(button)

                expect(onClose).toHaveBeenCalled()
            })
        })
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <Menu
                className="foo bar"
                onClose={jest.fn()}
                onOpen={jest.fn()}
                open={false}
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
