import { render } from '@testing-library/react'
import NavigationBar from './navigationBar'

jest.mock('lucide-react', () => ({
    ChevronsUpDown: jest.fn(),
    Search: jest.fn(),
}))

jest.mock('../tabs/tabs', () => () => <div>Tabs</div>)

describe('NavigationBar', () => {
    test('applies custom classes', async () => {
        const { container } = render(<NavigationBar className="foo" />)

        expect(container.firstElementChild?.classList.contains('foo')).toBe(
            true
        )
    })
})
