import { ReactJsonViewProps } from '@microlink/react-json-view'
import { render, waitFor } from '@testing-library/react'
import JsonTree from './jsonTree'

jest.mock('@microlink/react-json-view', () => (props: ReactJsonViewProps) => (
    <div>{JSON.stringify(props.src)}</div>
))

describe('JsonTree', () => {
    test('renders JSON', async () => {
        const { container } = render(<JsonTree data={{ foo: 'bar' }} />)

        await waitFor(() => {
            expect(container.firstChild).toHaveTextContent('{"foo":"bar"}')
        })
    })
})
