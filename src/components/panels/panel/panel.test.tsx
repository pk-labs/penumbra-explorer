import { getByText, render } from '@testing-library/react'
import { NumberCountupProps } from '../../numberCountup'
import Panel from './panel'

jest.mock(
    '../../numberCountup/numberCountup',
    () => (props: NumberCountupProps) => (
        <span>
            {props.prefix}
            {props.number}
            {props.suffix}
        </span>
    )
)

describe('Panel', () => {
    test('renders title and children', async () => {
        const { container } = render(<Panel title="Foo">Bar</Panel>)

        getByText(container, 'Foo')
        getByText(container, 'Bar')
    })

    test('renders number with prefix', async () => {
        const { container } = render(
            <Panel number={99} numberPrefix="$" title="Foo" />
        )

        getByText(container, '$99')
    })

    test('renders number with suffix', async () => {
        const { container } = render(
            <Panel number={99} numberSuffix=" UM" title="Foo" />
        )

        getByText(container, '99 UM')
    })

    test('renders any node as number', async () => {
        const { container } = render(
            <Panel number="Bar" numberSuffix="$" title="Foo" />
        )

        getByText(container, 'Bar')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <Panel className="foo bar" number={99} title="Foo" />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
