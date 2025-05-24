import { getByText, render } from '@testing-library/react'
import BurnPanel from './burnPanel'

jest.mock('../numberPanel/numberPanel', () => (props: any) => (
    <div className={props.className}>{props.number}</div>
))

describe('BurnPanel', () => {
    test('renders number', async () => {
        const { container } = render(<BurnPanel number={99} />)
        getByText(container, 99)
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <BurnPanel className="foo bar" number={0} />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
