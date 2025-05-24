import { getByText, render } from '@testing-library/react'
import UnbondingPanel from './unbondingPanel'

jest.mock('../numberPanel/numberPanel', () => (props: any) => (
    <div className={props.className}>{props.number}</div>
))

describe('UnbondingPanel', () => {
    test('renders number', async () => {
        const { container } = render(<UnbondingPanel number={99} />)
        getByText(container, 99)
    })

    test('applies CSS classes', async () => {
        const { container } = render(<UnbondingPanel className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
