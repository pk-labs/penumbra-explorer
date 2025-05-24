import { getByText, render } from '@testing-library/react'
import BlockPanel from './blockPanel'

jest.mock('../numberPanel/numberPanel', () => (props: any) => (
    <div className={props.className}>{props.number}</div>
))

describe('BlockPanel', () => {
    test('renders number', async () => {
        const { container } = render(<BlockPanel number={99} />)
        getByText(container, 99)
    })

    test('applies CSS classes', async () => {
        const { container } = render(<BlockPanel className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
