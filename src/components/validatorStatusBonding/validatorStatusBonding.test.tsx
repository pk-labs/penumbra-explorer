import { getByText, render } from '@testing-library/react'
import ValidatorStatusBonding from './validatorStatusBonding'

describe('ValidatorStatusBonding', () => {
    test('renders status and bonding', async () => {
        const { container } = render(
            <ValidatorStatusBonding bonding="Bonded" status="Active" />
        )

        getByText(container, 'Active')
        getByText(container, 'Bonded')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <ValidatorStatusBonding
                bonding="Bonded"
                className="foo bar"
                status="Active"
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
