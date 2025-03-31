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
    test('does not render menu items when closed', async () => {
        const { container } = render(
            <Menu onClose={jest.fn()} onOpen={jest.fn()} open={false}>
                <MenuItem href="/foo">Foo</MenuItem>
                <MenuItem href="/bar">Bar</MenuItem>
            </Menu>
        )

        expect(queryByText(container, 'Foo')).toBeNull()
        expect(queryByText(container, 'Bar')).toBeNull()
    })

    test('renders menu items when open', async () => {
        const { container } = render(
            <Menu onClose={jest.fn()} onOpen={jest.fn()} open>
                <MenuItem href="/foo">Foo</MenuItem>
                <MenuItem href="/bar">Bar</MenuItem>
            </Menu>
        )

        getByText(container, 'Foo')
        getByText(container, 'Bar')
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
