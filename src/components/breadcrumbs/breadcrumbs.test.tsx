import { getByText, queryByText, render } from '@testing-library/react'
import { Breadcrumb, BreadcrumbProps } from './breadcrumb'
import Breadcrumbs from './breadcrumbs'

jest.mock('lucide-react', () => ({
    ChevronRight: () => <div>ChevronRight</div>,
}))

jest.mock('./breadcrumb/breadcrumb', () => (props: BreadcrumbProps) => (
    <div>{props.children}</div>
))

describe('Breadcrumbs', () => {
    test('renders single breadcrumb', async () => {
        const { container } = render(
            <Breadcrumbs>
                <Breadcrumb href="/foo">Foo</Breadcrumb>
            </Breadcrumbs>
        )

        getByText(container, 'Foo')
        expect(queryByText(container, 'ChevronRight')).toBeNull()
    })

    test('renders multiple breadcrumbs', async () => {
        const { container } = render(
            <Breadcrumbs>
                <Breadcrumb href="/foo">Foo</Breadcrumb>
                <Breadcrumb href="/foo">Bar</Breadcrumb>
            </Breadcrumbs>
        )

        getByText(container, 'Foo')
        getByText(container, 'ChevronRight')
        getByText(container, 'Bar')
    })

    test('applies CSS classes', async () => {
        const { container } = render(<Breadcrumbs className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
