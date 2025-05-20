import {
    fireEvent,
    getByText,
    queryByText,
    render,
} from '@testing-library/react'
import { usePathname } from '@/lib/__tests__/__mocks__'
import HeaderContainer from './headerContainer'

jest.mock('motion/react', () => ({
    AnimatePresence: (props: any) => <div>{props.children}</div>,
    motion: {
        div: () => <div>Search modal</div>,
    },
}))

jest.mock('../../components/tabs/tabs', () => () => <div>Tabs</div>)

jest.mock('../searchContainer/searchContainer')

jest.mock('../../components/menu/menu', () => () => <div>Menu</div>)

jest.mock('../umPriceContainer/umPriceContainer')

describe('HeaderContainer', () => {
    test('hides search on home page', async () => {
        const { container } = render(<HeaderContainer />)
        expect(queryByText(container, 'Search')).toBeNull()
    })

    describe('search button', () => {
        test('is not rendered on home page', async () => {
            const { container } = render(<HeaderContainer />)
            expect(queryByText(container, 'Search')).toBeNull()
        })

        test('opens search modal', async () => {
            usePathname.mockReturnValue('/foo')
            const { container } = render(<HeaderContainer />)

            expect(queryByText(container, 'Search modal')).toBeNull()

            fireEvent.click(getByText(container, 'Search'))
            getByText(container, 'Search modal')
        })
    })

    test('applies CSS classes', async () => {
        const { container } = render(<HeaderContainer className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
