import { getByText, render } from '@testing-library/react'
import TableCell from './tableCell'

describe('TableCell', () => {
    test('renders as header or data cell', async () => {
        const { container } = render(
            <table>
                <tbody>
                    <tr>
                        <TableCell header>Foo</TableCell>
                        <TableCell>Bar</TableCell>
                    </tr>
                </tbody>
            </table>
        )

        expect(getByText(container, 'Foo').tagName).toBe('TH')
        expect(getByText(container, 'Bar').tagName).toBe('TD')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <table>
                <tbody>
                    <tr>
                        <TableCell className="foo bar" />
                    </tr>
                </tbody>
            </table>
        )

        expect(
            container.firstChild?.firstChild?.firstChild?.firstChild
        ).toHaveClass('foo', 'bar')
    })
})
