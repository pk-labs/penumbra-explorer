// istanbul ignore file
import { faker } from '@faker-js/faker'
import { ChevronRightIcon } from 'lucide-react'
import { FC } from 'react'
import { ProposalState } from '@/lib/types'
import { classNames } from '@/lib/utils'
import ProposalStatePill from '../../components/proposalStatePill'
import Surface from '../../components/surface'
import { Props } from './proposalPanelContainer'

const ProposalPanelLoader: FC<Props> = async props => {
    const proposal = await new Promise<any>(resolve =>
        setTimeout(
            () =>
                resolve({
                    description: faker.lorem.sentence({ max: 20, min: 5 }),
                    state: faker.helpers.arrayElement(
                        Object.values(ProposalState)
                    ),
                    title: `Proposal #${faker.number.int({ max: 999, min: 1 })}`,
                }),
            faker.number.int({ max: 3000, min: 2000 })
        )
    )

    return (
        <Surface
            as="section"
            className={classNames(
                'before:border-other-tonalFill10 flex items-center gap-4 px-6',
                'py-4 before:border-1 before:bg-transparent',
                'before:bg-linear-284 before:from-[rgba(186,77,20,0.05)]',
                'before:from-[9.77%] before:to-[rgba(193,166,204,0.35)]',
                'before:to-[99.84%]',
                props.className
            )}
        >
            <ProposalStatePill state={proposal.state} />
            <header className="flex flex-1 flex-col overflow-hidden">
                <h3 className="text-text-secondary font-mono text-xs font-medium">
                    {proposal.title}
                </h3>
                <div className="truncate text-lg font-medium">
                    {proposal.description}
                </div>
            </header>
            <ChevronRightIcon className="text-text-secondary" size={24} />
        </Surface>
    )
}

export default ProposalPanelLoader
