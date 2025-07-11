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
                <h2 className="text-lg">Governance parameters</h2>
                <Skeleton className="h-29 rounded-sm" />
                <Button
                    className="mt-4"
                    density="compact"
                    href="https://guide.penumbra.zone/overview/gov"
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
