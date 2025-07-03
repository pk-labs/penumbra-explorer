import { FC } from 'react'
import { ProposalState } from '@/lib/types'
import { classNames } from '@/lib/utils'
import ProposalStatePill from '../../proposalStatePill'
import Surface from '../../surface'

interface Props {
    className?: string
    description: string
    state: ProposalState
    title: string
}

const ProposalPanel: FC<Props> = props => (
    <Surface
        as="section"
        className={classNames(
            'before:border-other-tonalFill10 flex flex-row-reverse',
            'items-center gap-4 px-6 py-4 before:border-1',
            'before:bg-transparent before:bg-linear-284',
            'before:from-[rgba(186,77,20,0.05)] before:from-[9.77%]',
            'before:to-[rgba(193,166,204,0.35)] before:to-[99.84%]',
            props.className
        )}
    >
        <header className="flex flex-1 flex-col">
            <h3 className="text-text-secondary font-mono text-xs font-medium">
                {props.title}
            </h3>
            <div className="truncate text-lg font-medium">
                {props.description}
            </div>
        </header>
        <ProposalStatePill state={props.state} />
    </Surface>
)

export default ProposalPanel
