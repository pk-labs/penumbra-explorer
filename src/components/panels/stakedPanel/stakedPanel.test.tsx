import { getByText, render } from '@testing-library/react'
import StakedPanel from './stakedPanel'

jest.mock('../numberPanel/numberPanel', () => (props: any) => (
    <div className={props.className}>{props.number}</div>
))

describe('StakedPanel', () => {
    test('renders number', async () => {
        const { container } = render(<StakedPanel number={99} />)
        getByText(container, 99)
    })

    test('applies CSS classes', async () => {
        const { container } = render(<StakedPanel className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
