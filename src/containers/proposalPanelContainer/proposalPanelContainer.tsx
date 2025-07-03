// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton } from '@/components'
import { classNames } from '@/lib/utils'
import Surface from '../../components/surface'
import ProposalPanelLoader from './proposalPanelLoader'

export interface Props {
    className?: string
}

const ProposalPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <Surface
                as="section"
                className={classNames(
                    'before:border-other-tonalFill10 px-6 py-4 before:border-1',
                    'before:bg-transparent before:bg-linear-284',
                    'before:from-[rgba(186,77,20,0.05)] before:from-[9.77%]',
                    'before:to-[rgba(193,166,204,0.35)] before:to-[99.84%]',
                    props.className
                )}
            >
                <Skeleton className="h-11 rounded-sm" />
            </Surface>
        }
    >
        <ProposalPanelLoader {...props} />
    </Suspense>
)

export default ProposalPanelContainer
