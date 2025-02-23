import { getByText, render } from '@testing-library/react'
import Table from './table'

describe('Table', () => {
    test('renders children', async () => {
        const { container } = render(
            <Table>
                <tbody>
                    <tr>
                        <td>Foo</td>
                    </tr>
                </tbody>
            </Table>
        )

        getByText(container, 'Foo')
    })

    test('renders as section', async () => {
        const { container } = render(<Table footer="Bar" title="Foo" section />)

        expect(container.firstElementChild?.tagName).toBe('SECTION')

        expect(getByText(container, 'Foo').parentElement?.tagName).toBe(
            'HEADER'
        )

        expect(getByText(container, 'Bar').tagName).toBe('FOOTER')
    })

    test('renders title', async () => {
        const { container } = render(<Table title="Foo" />)
        getByText(container, 'Foo')
    })

    test('renders actions', async () => {
        const { container } = render(<Table actions="Foo" />)
        getByText(container, 'Foo')
    })

    test('renders footer', async () => {
        const { container } = render(
            <Table footer="Foo" footerClassName="foo" />
        )

        getByText(container, 'Foo')
        expect(container.firstChild?.lastChild).toHaveClass('foo')
    })

    test('applies custom classes', async () => {
        const { container } = render(<Table className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
