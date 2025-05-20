import { render } from '@testing-library/react'
import ShieldedPanel from './shieldedPanel'

jest.mock('../panel/panel', () => (props: any) => (
    <div className={props.className} />
))

describe('TransactionPanel', () => {
    test('applies CSS classes', async () => {
        const { container } = render(<ShieldedPanel className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
