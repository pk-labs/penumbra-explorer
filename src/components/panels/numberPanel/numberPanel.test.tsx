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

    test('applies CSS classes', async () => {
        const { container } = render(
            <NumberPanel number={0} numberClassName="number" title="Foo" />
        )

        expect(getByText(container, 0).parentNode).toHaveClass('number')
    })
})
