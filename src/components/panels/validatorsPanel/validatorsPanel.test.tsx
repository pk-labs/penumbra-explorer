import { getByText, render } from '@testing-library/react'
import ValidatorsPanel from './validatorsPanel'

jest.mock('../numberPanel/numberPanel', () => (props: any) => (
    <div className={props.className}>{props.number}</div>
))

describe('ValidatorsPanel', () => {
    test('renders number', async () => {
        const { container } = render(<ValidatorsPanel number={99} />)
        getByText(container, 99)
    })

    test('applies CSS classes', async () => {
        const { container } = render(<ValidatorsPanel className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
