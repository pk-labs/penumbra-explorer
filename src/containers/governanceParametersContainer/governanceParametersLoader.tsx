// istanbul ignore file
import { faker } from '@faker-js/faker'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Button, Parameter, Parameters, Surface } from '@/components'
import { blocksToTime, classNames, formatNumber } from '@/lib/utils'
import { Props } from './governanceParametersContainer'

const GovernanceParametersLoader: FC<Props> = async props => {
    const parameters = await new Promise<any>(resolve =>
        setTimeout(
            () =>
                resolve({
                    depositAmount: faker.number.int({ max: 100, min: 10 }),
                    passingTreshold: faker.number.int({ max: 69, min: 50 }),
                    proposalDuration: faker.number.int({
                        max: 40000,
                        min: 30000,
                    }),
                    slashingTreshold: faker.number.int({ max: 80, min: 70 }),
                    validQuorum: faker.number.int({ max: 49, min: 30 }),
                }),
            faker.number.int({ max: 3000, min: 2000 })
        )
    )

    if (!parameters) {
        notFound()
    }

    return (
        <Surface
            className={classNames('flex flex-col gap-2 p-6', props.className)}
        >
            <h3 className="text-lg">Governance parameters</h3>
            <Parameters>
                <Parameter name="Valid quorum">
                    {parameters.validQuorum}%
                </Parameter>
                <Parameter name="Passing treshold">
                    {parameters.passingTreshold}%
                </Parameter>
                <Parameter name="Slashing treshold">
                    {parameters.slashingTreshold}%
                </Parameter>
                <Parameter name="Deposit amount">
                    {formatNumber(parameters.depositAmount)} UM
                </Parameter>
                <Parameter name="Proposal duration">
                    {formatNumber(parameters.proposalDuration)} blocks{' '}
                    {blocksToTime(parameters.proposalDuration)}
                </Parameter>
            </Parameters>
            <Button
                className="mt-4"
                density="compact"
                href="https://guide.penumbra.zone/overview/gov"
                fullWidth
            >
                Learn more
            </Button>
        </Surface>
    )
}

export default GovernanceParametersLoader
