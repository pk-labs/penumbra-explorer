import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { TransformedBlockFragment } from '@/lib/types'
import { formatNumber } from '@/lib/utils'
import { CopyToClipboard, JsonTree, TransactionTable } from '../../index'
import { Parameter, Parameters } from '../../parameters'
import { View, ViewProps } from '../view'

export interface Props extends Pick<ViewProps, 'className'> {
    block: TransformedBlockFragment
}

const BlockView: FC<Props> = props => (
    <View
        className={twMerge(
            'from-[rgba(83,174,168,0.25)]!',
            'to-[rgba(83,174,168,0.03)]!',
            props.className
        )}
        subtitle={formatNumber(props.block.height)}
        title="Block view"
    >
        <Parameters>
            <Parameter name="Block height">
                {props.block.height}
                <CopyToClipboard
                    className="text-text-primary -mr-0.5"
                    text={props.block.height.toString()}
                    small
                />
            </Parameter>
            <Parameter name="Time">{props.block.createdAt}</Parameter>
            {/*<Parameter name="Proposer">-</Parameter>*/}
            <Parameter name="Txs">{props.block.transactions.length}</Parameter>
        </Parameters>
        <TransactionTable
            emptyStateMessage="This block contains no transactions"
            transactions={props.block.transactions}
            embedded
        />
        <JsonTree data={props.block.rawJson} />
    </View>
)

export default BlockView
