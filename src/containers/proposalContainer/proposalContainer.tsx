// istanbul ignore file
import { FC, Suspense } from 'react'
import { Button, Skeleton, Surface } from '@/components'
import { classNames } from '@/lib/utils'
import ProposalLoader from './proposalLoader'

export interface Props {
    className?: string
    proposalId: number
}

const ProposalContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <Surface
                as="section"
                className={classNames(
                    'flex flex-col gap-6 p-6',
                    props.className
                )}
            >
                <header className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <span className="font-mono text-base">
                            Proposal #{props.proposalId}
                        </span>
                        <Button
                            density="compact"
                            href="https://guide.penumbra.zone/overview/gov"
                        >
                            void.vote
                        </Button>
                    </div>
                </header>
                <Skeleton className="h-120 rounded-sm" />
            </Surface>
        }
    >
        <ProposalLoader {...props} />
    </Suspense>
)

export default ProposalContainer
