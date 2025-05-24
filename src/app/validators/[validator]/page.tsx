// istanbul ignore file
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import {
    LatestTransactionsContainer,
    ValidatorActivityPanelContainer,
    ValidatorContainer,
    VotingPowerPercentagePanelContainer,
    VotingPowerUmPanelContainer,
} from '@/containers'
import { classNames, generatePageMetadata } from '@/lib/utils'

interface Props {
    params: Promise<{ validator: string }>
}

export const generateMetadata = async (props: Props) => {
    const { validator } = await props.params

    return generatePageMetadata(
        `Validator ${validator}`,
        'TODO: Description',
        `/validators/${validator}`
    )
}

const ValidatorPage: FC<Props> = async props => {
    const { validator } = await props.params

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explore</Breadcrumb>
                <Breadcrumb href="/validators">Validators</Breadcrumb>
            </Breadcrumbs>
            <div className="grid grid-cols-12 items-start gap-4">
                <ValidatorContainer
                    className={classNames(
                        'col-span-12 md:col-span-5 md:row-span-3 lg:col-span-4! lg:row-span-2'
                    )}
                    validator={validator}
                />
                <VotingPowerUmPanelContainer
                    className={classNames(
                        'col-span-12 md:col-span-7 md:col-start-6 md:row-start-1 lg:col-span-3! lg:col-start-5!'
                    )}
                />
                <VotingPowerPercentagePanelContainer
                    className={classNames(
                        'col-span-12 md:col-span-3 md:col-start-6 md:row-start-2 lg:col-span-2! lg:col-start-8! lg:row-start-1!'
                    )}
                />
                <ValidatorActivityPanelContainer
                    className={classNames(
                        'col-span-12 md:col-span-4 md:col-start-9 md:row-start-2 lg:col-span-3! lg:col-start-10! lg:row-start-1!'
                    )}
                />
                <LatestTransactionsContainer
                    className="col-span-12 md:col-span-7 md:col-start-6 lg:col-span-8! lg:col-start-5!"
                    limit={10}
                    blockHeight
                    time
                />
            </div>
        </Container>
    )
}

export default ValidatorPage
