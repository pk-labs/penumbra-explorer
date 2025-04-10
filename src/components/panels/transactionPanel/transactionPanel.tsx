import Image from 'next/image'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { Panel, PanelProps } from '../panel'
import icon from './transactionPanelIcon.svg'

export type Props = Pick<PanelProps, 'className' | 'number'>

const TransactionPanel: FC<Props> = props => (
    <Panel
        className={twMerge(
            'from-[rgba(244,156,67,0.25)] to-[rgba(244,156,67,0.025)]',
            props.className
        )}
        number={props.number}
        title={
            <>
                <Image alt="Total transactions" src={icon} />
                <span>Total transactions</span>
            </>
        }
    />
)

export default TransactionPanel
