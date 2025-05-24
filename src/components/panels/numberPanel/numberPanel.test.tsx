import { getByText, render } from '@testing-library/react'
import { NumberCountupProps } from '../../numberCountup'
import NumberPanel from './numberPanel'

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

describe('NumberPanel', () => {
    test('renders number with prefix', async () => {
        const { container } = render(
            <NumberPanel number={99} numberPrefix="$" title="Foo" />
        )

        getByText(container, '$99')
    })

    test('renders number with suffix', async () => {
        const { container } = render(
            <NumberPanel number={99} numberSuffix=" UM" title="Foo" />
        )

        getByText(container, '99 UM')
    })

    test('renders 0 when number undefined', async () => {
        const { container } = render(<NumberPanel title="Foo" />)
        getByText(container, '0')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <NumberPanel number={99} numberClassName="number" title="Foo" />
        )

        expect(getByText(container, 99)).toHaveClass('number')
    })
})
