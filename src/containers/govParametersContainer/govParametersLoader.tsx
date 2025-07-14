// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Button, Parameter, Parameters, Surface } from '@/components'
import { getGovParameters } from '@/lib/data'
import { blocksToTime, classNames, formatNumber } from '@/lib/utils'
import { Props } from './govParametersContainer'

const GovParametersLoader: FC<Props> = async props => {
    const parameters = await getGovParameters()

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
                    {parameters.passingThreshold}%
                </Parameter>
                <Parameter name="Slashing treshold">
                    {parameters.slashingThreshold}%
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

export default GovParametersLoader
