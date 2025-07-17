'use client'

import { ChevronRightIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { FC } from 'react'
import { ProposalStatePill } from '@/components'
import { TransformedActiveProposal } from '@/lib/types'
import { classNames } from '@/lib/utils'

interface Props {
    className?: string
    proposal: TransformedActiveProposal
}

const ProposalPanel: FC<Props> = props => (
    <motion.div
        animate={{ height: 'auto' }}
        className={classNames('overflow-hidden', props.className)}
        initial={{ height: 0 }}
        transition={{
            damping: 26,
            mass: 2,
            stiffness: 200,
            type: 'spring',
        }}
    >
        <Link
            className={classNames(
                'border-other-tonalFill10 flex items-center gap-4 rounded-lg',
                'border-1 bg-linear-284 from-[rgba(186,77,20,0.05)]',
                'from-[9.77%] to-[rgba(193,166,204,0.35)] to-[99.84%] px-6',
                'py-4 backdrop-blur-lg'
            )}
            href={`/proposal/${props.proposal.id}`}
        >
            <ProposalStatePill state={props.proposal.state} />
            <div className="flex flex-1 flex-col overflow-hidden">
                <div
                    className={classNames(
                        'text-text-secondary font-mono text-xs font-medium'
                    )}
                >
                    Active proposal #{props.proposal.id} {props.proposal.kind}
                </div>
                <div
                    className={classNames(
                        'line-clamp-2 text-lg font-medium sm:line-clamp-none',
                        'sm:max-w-[600px] sm:truncate'
                    )}
                >
                    {props.proposal.title}
                </div>
            </div>
            <ChevronRightIcon className="text-text-secondary" size={24} />
        </Link>
    </motion.div>
)

export default ProposalPanel
