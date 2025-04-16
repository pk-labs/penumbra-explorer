import Image from 'next/image'
import { FC } from 'react'
import { classNames } from '@/lib/utils'
import { Panel, PanelProps } from '../panel'
import BlockPanelChart from './blockPanelChart'
import icon from './blockPanelIcon.svg'

export type Props = Pick<PanelProps, 'className' | 'number'>

const BlockPanel: FC<Props> = props => (
    <Panel
        className={classNames(
            'from-[rgba(83,174,168,0.25)] to-[rgba(83,174,168,0.03)]',
            props.className
        )}
        number={props.number}
        title={
            <>
                <Image alt="Current block" src={icon} />
                <span>Current block</span>
            </>
        }
    >
        <BlockPanelChart />
    </Panel>
)

export default BlockPanel
