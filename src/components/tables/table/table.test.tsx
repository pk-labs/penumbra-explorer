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

    test('renders header', async () => {
        const { container } = render(<Table header="Foo" />)
        getByText(container, 'Foo')
    })

    test('renders footer', async () => {
        const { container } = render(<Table footer="Foo" />)
        getByText(container, 'Foo')
    })

    test('applies CSS classes', async () => {
        const { container } = render(<Table className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
