import clsx from 'clsx'
import { Copy } from 'lucide-react'
import { FC } from 'react'
import { Block, Transaction } from '../../../lib/types'
import { formatNumber } from '../../../lib/utils'
import { DataList, DataListItem } from '../../dataList'
import { TransactionTable } from '../../tables'
import { View, ViewProps } from '../view'
import styles from './blockView.module.css'

interface Props extends Omit<ViewProps, 'children'> {
    block: Block
    transactions: Transaction[]
}

const BlockView: FC<Props> = props => (
    <View
        className={clsx(styles.root, props.className)}
        subtitle={formatNumber(props.block.height)}
        title={props.title}
    >
        <DataList>
            <DataListItem name="Block height">
                {props.block.height}
            </DataListItem>
            <DataListItem name="Time">{props.block.date}</DataListItem>
            <DataListItem name="Proposer">
                {props.block.proposer}
                <Copy color="var(--textSecondary)" size={14} />
            </DataListItem>
            <DataListItem name="Txs">{props.block.transactions}</DataListItem>
        </DataList>
        <TransactionTable transactions={props.transactions} />
    </View>
)

export default BlockView
