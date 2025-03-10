import { getByText, render } from '@testing-library/react'
import { Tab, TabProps } from './tab'
import Tabs from './tabs'

jest.mock('./tab/tab', () => (props: TabProps) => <div>{props.children}</div>)

describe('Tabs', () => {
    test('renders tabs', async () => {
        const { container } = render(
            <Tabs>
                <Tab href="/foo">Foo</Tab>
                <Tab href="/bar">Bar</Tab>
            </Tabs>
        )

        getByText(container, 'Foo')
        getByText(container, 'Bar')
    })

    test('applies CSS classes', async () => {
        const { container } = render(<Tabs className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
