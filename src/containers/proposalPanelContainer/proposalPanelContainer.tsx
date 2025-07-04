// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton } from '@/components'
import { classNames } from '@/lib/utils'
import ProposalPanelLoader from './proposalPanelLoader'

export interface Props {
    className?: string
}

const ProposalPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <div
                className={classNames(
                    'border-other-tonalFill10 rounded-lg border-1',
                    'bg-linear-284 from-[rgba(186,77,20,0.05)] from-[9.77%]',
                    'to-[rgba(193,166,204,0.35)] to-[99.84%] px-6 py-4',
                    'backdrop-blur-lg',
                    props.className
                )}
            >
                <Skeleton className="h-18.5 rounded-sm sm:h-11" />
            </div>
        }
    >
        <ProposalPanelLoader {...props} />
    </Suspense>
)

export default ProposalPanelContainer
