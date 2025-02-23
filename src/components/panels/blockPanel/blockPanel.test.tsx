import { getByText, render } from '@testing-library/react'
import { PanelProps } from '../panel'
import BlockPanel from './blockPanel'

jest.mock('lucide-react', () => ({
    Box: jest.fn(),
}))

jest.mock('../panel/panel', () => (props: PanelProps) => (
    <div>{props.className}</div>
))

describe('BlockPanel', () => {
    test('applies custom classes', async () => {
        const { container } = render(<BlockPanel className="foo bar" />)
        getByText(container, 'root foo bar')
    })
})
