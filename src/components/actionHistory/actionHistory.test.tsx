import { getByText, render } from '@testing-library/react'
import ActionHistory from './actionHistory'

jest.mock('../../lib/utils/transactionToView/transactionToView', () => () => ({
    bodyView: {
        actionViews: [
            { actionView: { case: 'bar' } },
            { actionView: { case: 'baz' } },
        ],
    },
}))

describe('ActionHistory', () => {
    test('renders actions', async () => {
        const { container } = render(
            <ActionHistory blockHeight={99} hash="foo" rawTransaction="foo" />
        )

        getByText(container, 'bar')
        getByText(container, 'baz')
    })
})
