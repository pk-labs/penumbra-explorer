import Image from 'next/image'
import { FC } from 'react'
import { classNames } from '@/lib/utils'
import { NumberPanel } from '../numberPanel'
import BlockPanelChart from './blockPanelChart'
import blockPanelIcon from './blockPanelIcon.svg'

interface Props {
    className?: string
    fallback?: boolean
    number: number
}

const BlockPanel: FC<Props> = props => (
    <NumberPanel
        className={classNames(
            'justify-between gap-4 before:bg-transparent',
            'before:bg-radial-[100%_100%_at_0%_0%]',
            'before:from-[rgba(83,174,168,0.25)] before:from-0%',
            'before:to-[rgba(83,174,168,0.03)] before:to-100% sm:flex-row',
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
    </NumberPanel>
)

export default BlockPanel
