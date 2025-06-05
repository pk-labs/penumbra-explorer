import { getByText, render } from '@testing-library/react'
import { BondingState, ValidatorState } from '@/lib/graphql/generated/types'
import ValidatorStateBonding from './validatorStateBonding'

describe('ValidatorStateBonding', () => {
    test('renders state and bonding', async () => {
        const { container } = render(
            <ValidatorStateBonding
                bondingState={BondingState.BondingStateEnumUnbonded}
                state={ValidatorState.ValidatorStateEnumInactive}
            />
        )

        getByText(container, 'Inactive')
        getByText(container, 'Unbonded')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <ValidatorStateBonding
                bondingState={BondingState.BondingStateEnumBonded}
                className="foo bar"
                state={ValidatorState.ValidatorStateEnumActive}
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
