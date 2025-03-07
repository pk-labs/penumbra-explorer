import { getByText, render } from '@testing-library/react'
import Actions from './actions'

describe('Actions', () => {
    test('renders actions', async () => {
        const { container } = render(
            <Actions actions={['IbcRelay', 'Spend']} />
        )

        getByText(container, 'IbcRelay')
        getByText(container, 'Spend')
    })
})
