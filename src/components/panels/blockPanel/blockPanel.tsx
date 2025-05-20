import Image from 'next/image'
import { FC } from 'react'
import { classNames } from '@/lib/utils'
import Panel from '../panel'
import BlockPanelChart from './blockPanelChart'
import blockPanelIcon from './blockPanelIcon.svg'

interface Props {
    className?: string
    fallback?: boolean
    number?: number
}

const BlockPanel: FC<Props> = props => (
    <Panel
        className={classNames(
            'bg-transparent bg-radial-[100%_100%_at_0%_0%]',
            'from-[rgba(83,174,168,0.25)] from-0% to-[rgba(83,174,168,0.03)]',
            'to-100%',
            props.className
        )}
        headerClassName="gap-2"
        number={props.number}
        title={
            <>
                <Image alt="Block panel" src={blockPanelIcon} />
                <span>Current block</span>
            </>
        }
        titleClassName="text-base font-medium"
    >
        <BlockPanelChart animate={!props.fallback} />
    </Panel>
)

export default BlockPanel
