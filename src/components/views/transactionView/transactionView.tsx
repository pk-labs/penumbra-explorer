import clsx from 'clsx'
import { Copy } from 'lucide-react'
import { FC } from 'react'
import { Transaction } from '../../../lib/types'
import { shortenHash } from '../../../lib/utils'
import { DataList, DataListItem } from '../../dataList'
import { View, ViewProps } from '../view'
import styles from './transactionView.module.css'

interface Props extends Omit<ViewProps, 'children'> {
    transaction: Transaction
}

const TransactionView: FC<Props> = props => (
    <View
        className={clsx(styles.root, props.className)}
        subtitle={props.subtitle}
        title={props.title}
    >
        <DataList>
            <DataListItem name="Transaction hash">
                {shortenHash(props.transaction.hash)}
                <Copy color="var(--textSecondary)" size={14} />
            </DataListItem>
            <DataListItem name="Block height">
                {props.transaction.blockHeight}
            </DataListItem>
            <DataListItem name="Time">{props.transaction.date}</DataListItem>
        </DataList>
    </View>
)

export default TransactionView
