import { getByText, render } from '@testing-library/react'
import { ActionProps } from './action'
import Actions from './actions'

jest.mock('./action/action', () => (props: ActionProps) => (
    <div>{props.action.__typename}</div>
))

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
