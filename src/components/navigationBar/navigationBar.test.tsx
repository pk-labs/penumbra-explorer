import {
    fireEvent,
    getByText,
    queryByText,
    render,
} from '@testing-library/react'
import { usePathname } from '@/lib/__tests__/__mocks__'
import NavigationBar from './navigationBar'

jest.mock('motion/react', () => ({
    AnimatePresence: (props: any) => <div>{props.children}</div>,
    motion: {
        div: () => <div>Search modal</div>,
    },
}))

jest.mock('../tabs/tabs', () => () => <div>Tabs</div>)

jest.mock('../search/search')

jest.mock('../../lib/graphql/graphqlClientProvider', () => (props: any) => (
    <div>{props.children}</div>
))

jest.mock('../menu/menu', () => () => <div>Menu</div>)

jest.mock('../umPrice/umPriceContainer')

describe('NavigationBar', () => {
    test('hides search on home page', async () => {
        const { container } = render(<NavigationBar />)
        expect(queryByText(container, 'Search')).toBeNull()
    })

    describe('search button', () => {
        test('is not rendered on home page', async () => {
            const { container } = render(<NavigationBar />)
            expect(queryByText(container, 'Search')).toBeNull()
        })

        test('opens search modal', async () => {
            usePathname.mockReturnValue('/foo')
            const { container } = render(<NavigationBar />)

            expect(queryByText(container, 'Search modal')).toBeNull()

            fireEvent.click(getByText(container, 'Search'))
            getByText(container, 'Search modal')
        })
    })

    test('applies CSS classes', async () => {
        const { container } = render(<NavigationBar className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
