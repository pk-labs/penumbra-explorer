import {
    fireEvent,
    getByText,
    queryByText,
    render,
} from '@testing-library/react'
import { usePathname } from '@/lib/__tests__/__mocks__'
import NavigationBar from './navigationBar'

jest.mock('lucide-react', () => ({
    ChevronsUpDown: jest.fn(),
    Search: jest.fn(),
    XIcon: jest.fn(),
}))

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

        test('label is hidden below sm', async () => {
            usePathname.mockReturnValue('/foo')
            const { container } = render(<NavigationBar />)

            expect(getByText(container, 'Search')).toHaveClass(
                'hidden',
                'sm:inline'
            )
        })
    })

    describe('UM price', () => {
        test('label is hidden below sm', async () => {
            const { container } = render(
                <NavigationBar umPrice={{ change: 0, price: 0 }} />
            )

            expect(getByText(container, 'UM Price:')).toHaveClass(
                'hidden',
                'sm:inline'
            )
        })

        test('renders positive change', async () => {
            const { container } = render(
                <NavigationBar umPrice={{ change: 1.234, price: 9999 }} />
            )

            getByText(container, '$9999.00')

            expect(getByText(container, '(+1.2%)')).toHaveClass(
                'text-(--positiveLight)'
            )
        })

        test('with negative change', async () => {
            const { container } = render(
                <NavigationBar umPrice={{ change: -1.234, price: 9.991 }} />
            )

            getByText(container, '$9.99')

            expect(getByText(container, '(-1.2%)')).toHaveClass(
                'text-(--negativeLight)'
            )
        })
    })

    test('applies CSS classes', async () => {
        const { container } = render(<NavigationBar className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
