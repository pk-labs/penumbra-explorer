import { fireEvent, getByText, render } from '@testing-library/react'
import { router } from '@/lib/__tests__/__mocks__'
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

    test('navigates to href on click', async () => {
        const { container } = render(
            <table>
                <tbody>
                    <TableRow href="/foo">
                        <td>
                            <a href="/bar">Bar</a>
                        </td>
                    </TableRow>
                </tbody>
            </table>
        )

        fireEvent.click(getByText(container, 'Bar'))
        expect(router.push).not.toHaveBeenCalled()

        const row = container.firstChild?.firstChild?.firstChild

        if (!row) {
            throw Error('Missing element')
        }

        expect(row).toHaveClass('clickable')

        fireEvent.click(row)
        expect(router.push).toHaveBeenCalledWith('/foo')
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
