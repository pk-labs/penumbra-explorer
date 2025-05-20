import Image from 'next/image'
import { FC } from 'react'
import { classNames } from '@/lib/utils'
import { Panel, PanelProps } from '../panel'
import BlockPanelChart from './blockPanelChart'
import blockPanelIcon from './blockPanelIcon.svg'

export interface Props extends Pick<PanelProps, 'className' | 'number'> {
    fallback?: boolean
}

const BlockPanel: FC<Props> = props => (
    <Panel
        className={classNames(
            'bg-transparent bg-radial-[100%_100%_at_0%_0%]',
            'from-[rgba(83,174,168,0.25)] from-0% to-[rgba(83,174,168,0.03)]',
            'to-100%',
            props.className
        )}
        number={props.number}
        title={
            <>
                <Image alt="Block panel" src={blockPanelIcon} />
                <span>Current block</span>
            </>
        }
    >
        <BlockPanelChart animate={!props.fallback} />
    </Panel>
)

export default BlockPanel
