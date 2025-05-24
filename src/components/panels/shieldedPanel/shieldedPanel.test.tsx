import { getByText, render } from '@testing-library/react'
import ShieldedPanel from './shieldedPanel'

jest.mock('../numberPanel/numberPanel', () => (props: any) => (
    <div className={props.className}>{props.number}</div>
))

describe('ShieldedPanel', () => {
    test('renders number', async () => {
        const { container } = render(<ShieldedPanel number={99} />)
        getByText(container, 99)
    })

    test('applies CSS classes', async () => {
        const { container } = render(<ShieldedPanel className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
