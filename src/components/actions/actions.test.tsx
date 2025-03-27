import { getByText, render } from '@testing-library/react'
import { ActionType } from '@/lib/types'
import Actions from './actions'

describe('Actions', () => {
    test('renders actions', async () => {
        const { container } = render(
            <Actions actions={[ActionType.ibcRelayAction, ActionType.spend]} />
        )

        getByText(container, 'IBC Relay Action')
        getByText(container, 'Spend')
    })

    test('marks unimplemented actions', async () => {
        const { container } = render(
            <Actions
                actions={[ActionType.spend, ActionType.output, ActionType.swap]}
            />
        )

        expect(getByText(container, 'Spend').parentNode).not.toHaveTextContent(
            'Unimplemented'
        )

        expect(getByText(container, 'Output').parentNode).not.toHaveTextContent(
            'Unimplemented'
        )

        expect(getByText(container, 'Swap').parentNode).toHaveTextContent(
            'Unimplemented'
        )
    })
})
