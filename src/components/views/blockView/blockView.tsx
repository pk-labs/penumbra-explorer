import { faker } from '@faker-js/faker'
import { FC } from 'react'
import dayjs from '@/lib/dayjs'
import { TransformedBlockFragment } from '@/lib/types'
import { classNames, formatNumber } from '@/lib/utils'
import CopyToClipboard from '../../copyToClipboard'
import DexExecution from '../../dexExecution'
import JsonTree from '../../jsonTree'
import { Parameter, Parameters } from '../../parameters'
import Subsection from '../../subsection'
import { TransactionTable } from '../../tables'
import { View, ViewProps } from '../view'

const baseAssetIds = [
    'DJlyenhbLm2EYBi/BkFJ7SNSEF1aJj2vm/1zGoz5vAc=',
    'QU5yP3S9mHwCzLyZdYXtUrGW4v/nWzeTqmjMKZZiaRA=',
    'qaDFFlDQ00yzmgR0QElCA9WgtA847cyE+R6aaXClQQg=',
    'LdexCcIS7h5jbSjieMV+MoC2IB1XmuKxzNNeRgq4QAQ=',
    'WdHeHDmklWKxFf0g86MiYy6Mt6lUQza5g+NfNuK2oAE=',
    'UxSzPuz9XKLpnAttHgzK/j0t1YHJUtgU+2T99R+FxBE=',
]

const quoteAssetId = 'KeqcLzNx9qSH5+lcJHBB9KNW+YPrBk5dKzvPMiypahA='

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
        <Subsection title="Executions">
            <DexExecution
                baseAmount={faker.number.int({ max: 5000000, min: 1 })}
                baseAssetId={faker.helpers.arrayElement(baseAssetIds)}
                id="1"
                quoteAmount={faker.number.int({ max: 5000000, min: 1 })}
                quoteAssetId={quoteAssetId}
                swaps={Array.from({
                    length: faker.number.int({ max: 8, min: 1 }),
                }).map(() =>
                    Array.from({
                        length: faker.number.int({ max: 7, min: 2 }),
                    }).map(() => ({
                        amount: faker.number.int({ max: 5000000, min: 1 }),
                        assetId: faker.helpers.arrayElement(baseAssetIds),
                    }))
                )}
            />
        </Subsection>
        {props.block.rawJson && <JsonTree data={props.block.rawJson} />}
    </View>
)

export default BlockView
