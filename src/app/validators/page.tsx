// istanbul ignore file
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Button, Container } from '@/components'
import {
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

const ValidatorsPage: FC = () => (
    <Container>
        <Breadcrumbs>
            <Breadcrumb href="/">Explore</Breadcrumb>
            <Breadcrumb>Validators</Breadcrumb>
        </Breadcrumbs>
        <div className="grid grid-cols-12 gap-4">
            <StakedPanelContainer className="col-span-12 md:col-span-4" />
            <ValidatorsPanelContainer
                className={classNames(
                    'col-span-12 sm:col-span-6 md:col-span-4'
                )}
            />
            <UnbondingPanelContainer
                className={classNames(
                    'col-span-12 sm:col-span-6 md:col-span-4'
                )}
            />
            <ValidatorParametersContainer
                className={classNames(
                    'col-span-12 lg:col-span-3 lg:col-start-10 lg:row-start-2',
                    'lg:self-start'
                )}
            />
            <ValidatorsPerformanceContainer
                className={classNames(
                    'col-span-12 lg:col-span-9 lg:col-start-1 lg:row-start-2'
                )}
                header={
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <h2 className="text-2xl font-medium">
                            Validators performance
                        </h2>
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
                }
            />
        </div>
    </Container>
)

export default ValidatorsPage
