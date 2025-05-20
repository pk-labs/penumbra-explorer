import { render } from '@testing-library/react'
import StakedPanel from './stakedPanel'

jest.mock('../panel/panel', () => (props: any) => (
    <div className={props.className} />
))

describe('StakedPanel', () => {
    test('applies CSS classes', async () => {
        const { container } = render(<StakedPanel className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
