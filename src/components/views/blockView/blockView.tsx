import { FC } from 'react'
import dayjs from '@/lib/dayjs'
import { TransformedBlockFragment } from '@/lib/types'
import { classNames, formatNumber } from '@/lib/utils'
import { CopyToClipboard, JsonTree, TransactionTable } from '../../index'
import { Parameter, Parameters } from '../../parameters'
import { View, ViewProps } from '../view'

export interface Props extends Pick<ViewProps, 'className'> {
    block: TransformedBlockFragment
}

const BlockView: FC<Props> = props => (
    <View
        className={classNames(
            'from-[rgba(83,174,168,0.25)]!',
            'to-[rgba(83,174,168,0.03)]!',
            props.className
        )}
        title="Block view"
    >
        <Parameters className="bg-other-tonalFill5 rounded-sm p-3">
            <Parameter name="Block height">
                {formatNumber(props.block.height)}
                <CopyToClipboard
                    className="text-text-primary -mr-0.5"
                    text={props.block.height.toString()}
                    small
                />
            </Parameter>
            <Parameter name="Time">
                {dayjs(props.block.timestamp)
                    .tz('UTC')
                    .format('YYYY-MM-DD HH:mm:ss z')}
            </Parameter>
            {/*<Parameter name="Proposer">-</Parameter>*/}
            <Parameter name="Txs">{props.block.transactions.length}</Parameter>
        </Parameters>
        <TransactionTable
            className="rounded-sm p-0 backdrop-blur-none"
            emptyStateMessage="This block contains no transactions"
            transactions={props.block.transactions}
        />
        {props.block.rawJson && <JsonTree data={props.block.rawJson} />}
    </View>
)

export default BlockView
