import { getByText, render } from '@testing-library/react'
import { ActionItemProps } from './actionItem'
import Actions from './actions'

jest.mock('./actionItem/actionItem', () => (props: ActionItemProps) => (
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
