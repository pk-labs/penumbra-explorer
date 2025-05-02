import { FC } from 'react'
import { classNames } from '@/lib/utils'
import { Panel, PanelProps } from '../panel'
import TransactionPanelIcon from './transactionPanelIcon'

export type Props = Pick<PanelProps, 'className' | 'number'>

const TransactionPanel: FC<Props> = props => (
    <Panel
        className={classNames(
            'from-[rgba(244,156,67,0.25)] to-[rgba(244,156,67,0.025)]',
            props.className
        )}
        number={props.number}
        title={
            <>
                <TransactionPanelIcon />
                <span>Total transactions</span>
            </>
        }
    />
)

export default TransactionPanel
