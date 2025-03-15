import { getByText, render } from '@testing-library/react'
import { usePathname } from '@/lib/__tests__/__mocks__'
import Tab from './tab'

describe('Tab', () => {
    test('renders inactive', async () => {
        const { container } = render(<Tab href="/foo">Foo</Tab>)

        const tab = getByText(container, 'Foo')
        expect(tab).toHaveAttribute('href', '/foo')
        expect(tab).not.toHaveClass('text-(--text)')
    })

    test('renders active', async () => {
        const { container } = render(<Tab href="/">Foo</Tab>)

        const tab = getByText(container, 'Foo')
        expect(tab).toHaveAttribute('href', '/')
        expect(tab).toHaveClass('text-(--text)')
    })

    test('renders active for matching paths', async () => {
        usePathname.mockReturnValueOnce('/block/123')

        const { container } = render(
            <Tab href="/blocks" paths={['/block']}>
                Foo
            </Tab>
        )

        const tab = getByText(container, 'Foo')
        expect(tab).toHaveAttribute('href', '/blocks')
        expect(tab).toHaveClass('text-(--text)')
    })
})
