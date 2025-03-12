import { getByText, render } from '@testing-library/react'
import TableRow from './tableRow'

describe('TableRow', () => {
    test('renders children', async () => {
        const { container } = render(
            <table>
                <tbody>
                    <TableRow>
                        <th>Foo</th>
                        <td>Bar</td>
                    </TableRow>
                </tbody>
            </table>
        )

        getByText(container, 'Foo')
        getByText(container, 'Bar')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <table>
                <tbody>
                    <TableRow className="foo bar" />
                </tbody>
            </table>
        )

        expect(container.firstChild?.firstChild?.firstChild).toHaveClass(
            'foo',
            'bar'
        )
    })
})
