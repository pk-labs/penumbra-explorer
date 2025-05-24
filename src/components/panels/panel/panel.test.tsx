import { getByText, render } from '@testing-library/react'
import Panel from './panel'

describe('Panel', () => {
    test('renders title', async () => {
        const { container } = render(<Panel title="Foo" />)
        getByText(container, 'Foo')
    })

    test('renders header', async () => {
        const { container } = render(<Panel header="Bar" title="Foo" />)
        getByText(container, 'Bar')
    })

    test('renders children', async () => {
        const { container } = render(<Panel title="Foo">Bar</Panel>)
        getByText(container, 'Bar')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <Panel
                className="foo bar"
                headerClassName="header"
                title="Foo"
                titleClassName="title"
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
        expect(getByText(container, 'Foo')).toHaveClass('title')
        expect(getByText(container, 'Foo').parentNode).toHaveClass('header')
    })
})
