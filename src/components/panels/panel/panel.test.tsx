import { getByText, render } from '@testing-library/react'
import Panel from './panel'

jest.mock('react-countup', () => (props: { end: number }) => (
    <div>{props.end}</div>
))

describe('Panel', () => {
    test('renders title, number and children', async () => {
        const { container } = render(
            <Panel number={99} title="Foo">
                Bar
            </Panel>
        )

        getByText(container, 'Foo')
        getByText(container, 99)
        getByText(container, 'Bar')
    })

    test('applies custom classes', async () => {
        const { container } = render(
            <Panel className="foo bar" number={99} title="Foo" />
        )

        expect(container.firstElementChild?.classList.contains('foo')).toBe(
            true
        )

        expect(container.firstElementChild?.classList.contains('bar')).toBe(
            true
        )
    })
})
