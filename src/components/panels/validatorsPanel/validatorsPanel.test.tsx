import { render } from '@testing-library/react'
import ValidatorsPanel from './validatorsPanel'

jest.mock('../panel/panel', () => (props: any) => (
    <div className={props.className} />
))

describe('ValidatorsPanel', () => {
    test('applies CSS classes', async () => {
        const { container } = render(<ValidatorsPanel className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
