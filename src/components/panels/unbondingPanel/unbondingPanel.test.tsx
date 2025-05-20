import { render } from '@testing-library/react'
import UnbondingPanel from './unbondingPanel'

jest.mock('../panel/panel', () => (props: any) => (
    <div className={props.className} />
))

describe('UnbondingPanel', () => {
    test('applies CSS classes', async () => {
        const { container } = render(<UnbondingPanel className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
