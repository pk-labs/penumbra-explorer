import { getByText, render } from '@testing-library/react'
import { NumberCountupProps } from '../../numberCountup'
import Panel from './panel'

jest.mock(
    '../../numberCountup/numberCountup',
    () => (props: NumberCountupProps) => (
        <span className={props.className}>
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

    test('renders 0 when number undefined', async () => {
        const { container } = render(<Panel title="Foo" />)
        getByText(container, '0')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <Panel
                className="foo bar"
                headerClassName="header"
                number={99}
                numberClassName="number"
                title="Foo"
                titleClassName="title"
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
        expect(getByText(container, 'Foo')).toHaveClass('title')
        expect(getByText(container, 'Foo').parentNode).toHaveClass('header')
        expect(getByText(container, 99)).toHaveClass('number')
    })
})
