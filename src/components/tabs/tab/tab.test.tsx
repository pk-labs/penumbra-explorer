import { getByText, render } from '@testing-library/react'
import Tab from './tab'

describe('Tab', () => {
    test('renders inactive', async () => {
        const { container } = render(<Tab href="/foo">Foo</Tab>)

        const tab = getByText(container, 'Foo')
        expect(tab).toHaveAttribute('href', '/foo')
        expect(tab).not.toHaveClass('active')
    })

    test('renders active', async () => {
        const { container } = render(<Tab href="/">Foo</Tab>)

        const tab = getByText(container, 'Foo')
        expect(tab).toHaveAttribute('href', '/')
        expect(tab).toHaveClass('active')
    })
})
