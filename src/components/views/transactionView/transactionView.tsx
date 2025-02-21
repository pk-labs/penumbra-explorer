import clsx from 'clsx'
import { FC } from 'react'
import { TransactionFragment } from '../../../lib/graphql/generated/types'
import { shortenHash } from '../../../lib/utils'
import CopyToClipboard from '../../copyToClipboard'
import { DataList, DataListItem } from '../../dataList'
import { View, ViewProps } from '../view'
import styles from './transactionView.module.css'

interface Props extends Omit<ViewProps, 'children'> {
    transaction: TransactionFragment
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
                <CopyToClipboard data={props.transaction.hash} iconSize={14} />
            </DataListItem>
            <DataListItem name="Block height">
                {props.transaction.block.height}
            </DataListItem>
            <DataListItem name="Time">
                {props.transaction.block.createdAt}
            </DataListItem>
        </DataList>
    </View>
)

export default TransactionView
