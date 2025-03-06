import { getByText, render } from '@testing-library/react'
import Panel from './panel'

jest.mock('../../numberCountup/numberCountup', () => (props: any) => (
    <div>
        {props.children}
        {props.suffix}
    </div>
))

describe('Panel', () => {
    test('renders title and children', async () => {
        const { container } = render(<Panel title="Foo">Bar</Panel>)

        getByText(container, 'Foo')
        getByText(container, 'Bar')
    })

    test('renders number and suffix', async () => {
        const { container } = render(
            <Panel number={99} numberSuffix="$" title="Foo" />
        )

        getByText(container, '99$')
    })

    test('applies custom classes', async () => {
        const { container } = render(
            <Panel className="foo bar" number={99} title="Foo" />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
