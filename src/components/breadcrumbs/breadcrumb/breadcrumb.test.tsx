import { getByText, render } from '@testing-library/react'
import Breadcrumb from './breadcrumb'

describe('Breadcrumb', () => {
    test('renders text', async () => {
        const { container } = render(<Breadcrumb>Foo</Breadcrumb>)
        expect(getByText(container, 'Foo')).not.toHaveAttribute('href')
    })

    test('renders link', async () => {
        const { container } = render(<Breadcrumb href="/foo">Foo</Breadcrumb>)
        expect(getByText(container, 'Foo')).toHaveAttribute('href', '/foo')
    })
})
