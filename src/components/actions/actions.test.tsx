import { getByText, render } from '@testing-library/react'
import Actions from './actions'

jest.mock('../../lib/utils/transactionToView/transactionToView', () => () => ({
    bodyView: {
        actionViews: [
            { actionView: { case: 'bar' } },
            { actionView: { case: 'baz' } },
        ],
    },
}))

describe('Actions', () => {
    test('renders actions', async () => {
        const { container } = render(
            <Actions
                blockHeight={99}
                chainId="foo"
                hash="foo"
                rawTransaction="foo"
            />
        )

        getByText(container, 'bar')
        getByText(container, 'baz')
    })
})
