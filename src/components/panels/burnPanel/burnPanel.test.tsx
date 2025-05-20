import { render } from '@testing-library/react'
import BurnPanel from './burnPanel'

jest.mock('../panel/panel', () => (props: any) => (
    <div className={props.className} />
))

describe('BurnPanel', () => {
    test('applies CSS classes', async () => {
        const { container } = render(<BurnPanel className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
