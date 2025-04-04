import {
    fireEvent,
    getByText,
    queryByText,
    render,
    waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import JsonTree from './jsonTree'

userEvent.setup()

describe('JsonTree', () => {
    test('is collapsed by default', async () => {
        const { container } = render(<JsonTree data={{ foo: 'bar' }} />)

        await waitFor(() => {
            getByText(container, 'root')
            expect(queryByText(container, 'foo')).toBeNull()
            expect(queryByText(container, 'bar')).toBeNull()
        })
    })

    test('expands first two levels on first click', async () => {
        const { container } = render(
            <JsonTree
                data={{
                    level1: {
                        level2: {
                            level3: 'foo',
                        },
                    },
                }}
            />
        )

        await waitFor(() => {
            getByText(container, 'root')
            expect(queryByText(container, 'level1')).toBeNull()
        })

        fireEvent.click(getByText(container, 'root'))

        await waitFor(() => {
            getByText(container, 'root')
            getByText(container, 'level1')
            getByText(container, 'level2')
            expect(queryByText(container, 'level3')).toBeNull()
        })
    })
})
