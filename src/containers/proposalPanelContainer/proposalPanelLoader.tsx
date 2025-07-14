// istanbul ignore file
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { getActiveProposals } from '@/lib/data'
import { classNames } from '@/lib/utils'
import ProposalStatePill from '../../components/pills/proposalStatePill'
import { Props } from './proposalPanelContainer'

const ProposalPanelLoader: FC<Props> = async props => {
    const proposals = await getActiveProposals()

    if (!proposals?.length) {
        return
    }

    const [proposal] = proposals

    return (
        <Link
            className={classNames(
                'border-other-tonalFill10 flex items-center gap-4 rounded-lg',
                'border-1 bg-linear-284 from-[rgba(186,77,20,0.05)]',
                'from-[9.77%] to-[rgba(193,166,204,0.35)] to-[99.84%] px-6',
                'py-4 backdrop-blur-lg',
                props.className
            )}
            href={`/proposal/${proposal.id}`}
        >
            <ProposalStatePill state={proposal.state} />
            <div className="flex flex-1 flex-col overflow-hidden">
                <div
                    className={classNames(
                        'text-text-secondary font-mono text-xs font-medium'
                    )}
                >
                    Proposal #{proposal.id} {proposal.kind}
                </div>
                <div
                    className={classNames(
                        'line-clamp-2 text-lg font-medium sm:line-clamp-none',
                        'sm:truncate'
                    )}
                >
                    {proposal.title}
                </div>
            </div>
            <ChevronRightIcon className="text-text-secondary" size={24} />
        </Link>
    )
}

export default ProposalPanelLoader
