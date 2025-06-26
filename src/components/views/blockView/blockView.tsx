import { FC } from 'react'
import dayjs from '@/lib/dayjs'
import {
    TransformedBlockFragment,
    TransformedDexSwapExecution,
} from '@/lib/types'
import { classNames, formatNumber } from '@/lib/utils'
import CopyToClipboard from '../../copyToClipboard'
import DexSwapExecution from '../../dexSwapExecution'
import JsonTree from '../../jsonTree'
import { Parameter, Parameters } from '../../parameters'
import Subsection from '../../subsection'
import { TransactionTable } from '../../tables'
import { View, ViewProps } from '../view'

export interface Props extends Pick<ViewProps, 'className'> {
    block: TransformedBlockFragment
    swapExecutions: TransformedDexSwapExecution[]
}

const BlockView: FC<Props> = props => (
    <View
        className={classNames(
            'from-[rgba(83,174,168,0.25)]!',
            'to-[rgba(83,174,168,0.03)]!',
            props.className
        )}
        nextHref={
            props.block.height > 1
                ? `/block/${props.block.height - 1}`
                : undefined
        }
        prevHref={`/block/${props.block.height + 1}`}
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
            transactions={props.block.transactions}
        />
        {props.swapExecutions.length > 0 && (
            <Subsection title="Executions">
                <div>
                    {props.swapExecutions.map(execution => (
                        <DexSwapExecution
                            key={execution.id}
                            {...execution}
                            className={classNames(
                                'not-last:not-only:border-b-other-tonalStroke',
                                'not-first:not-last:rounded-none',
                                'not-last:not-only:border-b-1',
                                'first:not-only:rounded-b-none',
                                'last:not-only:rounded-t-none'
                            )}
                        />
                    ))}
                </div>
            </Subsection>
        )}
        {props.block.rawJson && <JsonTree data={props.block.rawJson} />}
    </View>
)

export default BlockView
