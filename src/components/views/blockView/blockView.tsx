import clsx from 'clsx'
import { FC } from 'react'
import { BlockFragment } from '@/lib/graphql/generated/types'
import { formatNumber } from '@/lib/utils'
import JsonTree from '../../jsonTree'
import { Parameter, Parameters } from '../../parameters'
import { TransactionTable } from '../../tables'
import { View, ViewProps } from '../view'
import styles from './blockView.module.css'

interface Props extends Omit<ViewProps, 'children'> {
    block: BlockFragment
}

const BlockView: FC<Props> = props => {
    return (
        <View
            className={clsx(styles.root, props.className)}
            subtitle={formatNumber(props.block.height)}
            title={props.title}
        >
            <Parameters>
                <Parameter name="Block height">{props.block.height}</Parameter>
                <Parameter name="Time">{props.block.createdAt}</Parameter>
                <Parameter name="Proposer">-</Parameter>
                <Parameter name="Txs">-</Parameter>
            </Parameters>
            <TransactionTable
                className={styles.placeholderTable}
                transactions={props.block.transactions}
            />
            <JsonTree data={props.block} />
        </View>
    )
}

export default BlockView
