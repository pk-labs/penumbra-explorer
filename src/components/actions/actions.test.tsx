import { getByText, render } from '@testing-library/react'
import Actions from './actions'

describe('Actions', () => {
    test('renders actions', async () => {
        const { container } = render(
            <Actions
                actions={[{ __typename: 'IbcRelay' }, { __typename: 'Spend' }]}
            />
        )

        getByText(container, 'IbcRelay')
        getByText(container, 'Spend')
    })
})
