import { getByText, render } from '@testing-library/react'
import { usePathname } from '@/lib/__tests__/__mocks__'
import MenuItem from './menuItem'

describe('MenuItem', () => {
    test('renders inactive', async () => {
        const { container } = render(<MenuItem href="/foo">Foo</MenuItem>)

        const tab = getByText(container, 'Foo')
        expect(tab).toHaveAttribute('href', '/foo')
        expect(tab).not.toHaveClass('text-text-primary')
    })

    test('renders active', async () => {
        const { container } = render(<MenuItem href="/">Foo</MenuItem>)

        const tab = getByText(container, 'Foo')
        expect(tab).toHaveAttribute('href', '/')
        expect(tab).toHaveClass('text-text-primary')
    })

    test('renders active for matching paths', async () => {
        usePathname.mockReturnValueOnce('/block/123')

        const { container } = render(
            <MenuItem href="/blocks" paths={['/block']}>
                Foo
            </MenuItem>
        )

        const tab = getByText(container, 'Foo')
        expect(tab).toHaveAttribute('href', '/blocks')
        expect(tab).toHaveClass('text-text-primary')
    })
})
