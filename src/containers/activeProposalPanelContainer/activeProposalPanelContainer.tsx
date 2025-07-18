// istanbul ignore file
import { FC, Suspense } from 'react'
import ActiveProposalPanelLoader from './activeProposalPanelLoader'

export interface Props {
    className?: string
}

const ActiveProposalPanelContainer: FC<Props> = props => (
    <Suspense
    // No fallback for now because active proposals are infrequent
    // fallback={
    //     <div
    //         className={classNames(
    //             'border-other-tonal-fill10 rounded-lg border-1',
    //             'bg-linear-284 from-[rgba(186,77,20,0.05)] from-[9.77%]',
    //             'to-[rgba(193,166,204,0.35)] to-[99.84%] px-6 py-4',
    //             'backdrop-blur-lg',
    //             props.className
    //         )}
    //     >
    //         <Skeleton className="h-18.5 rounded-sm sm:h-11" />
    //     </div>
    // }
    >
        <ActiveProposalPanelLoader {...props} />
    </Suspense>
)

export default ActiveProposalPanelContainer
