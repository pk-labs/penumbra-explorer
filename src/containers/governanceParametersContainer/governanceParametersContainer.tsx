// istanbul ignore file
import { FC, Suspense } from 'react'
import { Button, Skeleton, Surface } from '@/components'
import { classNames } from '@/lib/utils'
import GovernanceParametersLoader from './governanceParametersLoader'

export interface Props {
    className?: string
}

const GovernanceParametersContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <Surface
                as="section"
                className={classNames(
                    'flex flex-col gap-2 p-6',
                    props.className
                )}
            >
                <h3 className="text-lg">Governance parameters</h3>
                <Skeleton className="h-29 rounded-sm" />
                <Button
                    className="mt-4"
                    density="compact"
                    href="https://guide.penumbra.zone/overview/gov"
                    externalLink
                    fullWidth
                >
                    Learn more
                </Button>
            </Surface>
        }
    >
        <GovernanceParametersLoader {...props} />
    </Suspense>
)

export default GovernanceParametersContainer
