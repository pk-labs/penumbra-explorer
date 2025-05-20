import Image from 'next/image'
import { FC } from 'react'
import { classNames } from '@/lib/utils'
import { Panel, PanelProps } from '../panel'
import transactionPanelIcon from './transactionPanelIcon.svg'

export type Props = Pick<PanelProps, 'className' | 'number'>

const TransactionPanel: FC<Props> = props => (
    <Panel
        className={classNames(
            'bg-transparent bg-radial-[100%_100%_at_0%_0%]',
            'from-[rgba(244,156,67,0.25)] from-0% to-[rgba(244,156,67,0.025)]',
            'to-100%',
            props.className
        )}
        number={props.number}
        title={
            <>
                <Image alt="Transaction panel" src={transactionPanelIcon} />
                <span>Total transactions</span>
            </>
        }
    />
)

export default TransactionPanel
