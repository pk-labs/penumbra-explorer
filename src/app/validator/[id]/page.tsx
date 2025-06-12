// istanbul ignore file
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import {
    TransactionTableContainer,
    ValidatorActiveSincePanelContainer,
    ValidatorContainer,
    ValidatorStatusContainer,
    ValidatorVotingPercentagePanelContainer,
    ValidatorVotingPowerPanelContainer,
} from '@/containers'
import { classNames, generatePageMetadata } from '@/lib/utils'

interface Props {
    params: Promise<{ id: string }>
}

export const generateMetadata = async (props: Props) => {
    const { id } = await props.params

    return generatePageMetadata(
        `Validator ${id}`,
        `Explore Penumbra Validator ${id} and track key metrics like ` +
            'Status, Voting power, Uptime, and Commission on Noctis - a ' +
            'fast, secure, and privacy-focused explorer built for Penumbra ' +
            'blockchain.',
        `/validator/${id}`
    )
}

const ValidatorPage: FC<Props> = async props => {
    const { id } = await props.params

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explore</Breadcrumb>
                <Breadcrumb href="/validators">Validators</Breadcrumb>
            </Breadcrumbs>
            <div className="grid grid-cols-12 items-start gap-4">
                <ValidatorContainer
                    className={classNames(
                        'col-span-12 md:col-span-5 md:row-span-4',
                        'lg:col-span-4! lg:row-span-3'
                    )}
                    validatorId={id}
                />
                <ValidatorVotingPowerPanelContainer
                    className={classNames(
                        'col-span-12 md:col-span-7 md:col-start-6',
                        'md:row-start-1 lg:col-span-3! lg:col-start-5!'
                    )}
                    validatorId={id}
                />
                <ValidatorVotingPercentagePanelContainer
                    className={classNames(
                        'col-span-12 md:col-span-3 md:col-start-6',
                        'md:row-start-2 lg:col-span-2! lg:col-start-8!',
                        'lg:row-start-1!'
                    )}
                    validatorId={id}
                />
                <ValidatorActiveSincePanelContainer
                    className={classNames(
                        'col-span-12 md:col-span-4 md:col-start-9',
                        'md:row-start-2 lg:col-span-3! lg:col-start-10!',
                        'lg:row-start-1!'
                    )}
                    validatorId={id}
                />
                <ValidatorStatusContainer
                    className={classNames(
                        'col-span-12 md:col-span-7 md:col-start-6',
                        'lg:col-span-8! lg:col-start-5!'
                    )}
                    validatorId={id}
                />
                <TransactionTableContainer
                    className={classNames(
                        'col-span-12 md:col-span-7 md:col-start-6',
                        'lg:col-span-8! lg:col-start-5!'
                    )}
                    emptyStateMessage="No transactions"
                    filter={{ validator: id }}
                    header={
                        <h2 className="text-2xl font-medium">
                            Latest transactions
                        </h2>
                    }
                    limit={{ length: 10 }}
                    blockHeight
                    time
                />
            </div>
        </Container>
    )
}

export default ValidatorPage
