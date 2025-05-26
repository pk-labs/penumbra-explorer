// istanbul ignore file
import { FC } from 'react'
import {
    Breadcrumb,
    Breadcrumbs,
    Button,
    Container,
    FilterSelector,
} from '@/components'
import {
    ChainParametersContainer,
    StakedPanelContainer,
    UnbondingPanelContainer,
    ValidatorParametersContainer,
    ValidatorsPanelContainer,
    ValidatorsPerformanceContainer,
} from '@/containers'
import { classNames, generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata(
    'Validators',
    'TODO: Description',
    '/validators'
)

interface Props {
    searchParams: Promise<{
        filter?: string
    }>
}

const ValidatorsPage: FC<Props> = async props => {
    const searchParams = await props.searchParams

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explore</Breadcrumb>
                <Breadcrumb>Validators</Breadcrumb>
            </Breadcrumbs>
            <div className="grid grid-cols-12 gap-4 lg:items-start">
                <StakedPanelContainer className="col-span-full md:col-span-4" />
                <ValidatorsPanelContainer
                    className={classNames(
                        'col-span-full sm:col-span-6 md:col-span-4'
                    )}
                />
                <UnbondingPanelContainer
                    className={classNames(
                        'col-span-full sm:col-span-6 md:col-span-4'
                    )}
                />
                <ChainParametersContainer
                    className={classNames(
                        'col-span-full sm:col-span-6 lg:col-span-3!',
                        'lg:col-start-10! lg:row-start-2!'
                    )}
                />
                <ValidatorParametersContainer
                    className={classNames(
                        'col-span-full sm:col-span-6 lg:col-span-3!',
                        'lg:col-start-10! lg:row-start-3!'
                    )}
                />
                <ValidatorsPerformanceContainer
                    className={classNames(
                        'col-span-full lg:col-span-9 lg:col-start-1',
                        'lg:row-span-3 lg:row-start-2'
                    )}
                    filter={searchParams.filter}
                    header={
                        <div className="flex flex-col gap-6">
                            <div
                                className={classNames(
                                    'flex flex-col gap-2 md:flex-row',
                                    'md:items-center md:justify-between'
                                )}
                            >
                                <h1 className="text-2xl font-medium">
                                    Validators performance
                                </h1>
                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        density="compact"
                                        href="https://app.penumbra.zone/#/staking"
                                    >
                                        Delegate to a validator
                                    </Button>
                                    <Button
                                        density="compact"
                                        href="https://guide.penumbra.zone/node/pd/validator"
                                        priority="secondary"
                                        externalLink
                                    >
                                        Become a validator
                                    </Button>
                                </div>
                            </div>
                            <FilterSelector
                                filters={['active', 'inactive']}
                                selectedFilter={searchParams.filter}
                            />
                        </div>
                    }
                />
            </div>
        </Container>
    )
}

export default ValidatorsPage
