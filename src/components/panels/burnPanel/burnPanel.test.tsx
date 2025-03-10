import { getByText, render } from '@testing-library/react'
import { PanelProps } from '../panel'
import BurnPanel from './burnPanel'

jest.mock('../panel/panel', () => (props: PanelProps) => (
    <div>{props.className}</div>
))

describe('BurnPanel', () => {
    test('applies CSS classes', async () => {
        const { container } = render(<BurnPanel className="foo bar" />)
        getByText(container, 'root gradient foo bar')
    })
})
