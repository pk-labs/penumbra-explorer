import { Link2Icon } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import dayjs from '@/lib/dayjs'
import { TransformedTransactionFragment } from '@/lib/types'
import { classNames, formatNumber, shortenHash } from '@/lib/utils'
import ActionHistory from '../../actionHistory'
import CopyToClipboard from '../../copyToClipboard'
import JsonTree from '../../jsonTree'
import Memo from '../../memo'
import { Parameter, Parameters } from '../../parameters'
import Subsection from '../../subsection'
import { View, ViewProps } from '../view'

export interface Props extends Pick<ViewProps, 'className'> {
    transaction: TransformedTransactionFragment
}

const TransactionView: FC<Props> = props => (
    <View
        className={classNames(
            'from-[rgba(193,166,204,0.25)]!',
            'to-[rgba(193,166,204,0.03)]!',
            props.className
        )}
        title="Transaction view"
    >
        <Parameters className="bg-other-tonalFill5 rounded-sm p-3">
            <Parameter name="Transaction hash">
                {shortenHash(props.transaction.hash)}
                <CopyToClipboard
                    className="text-text-primary -mr-[5px]"
                    text={props.transaction.hash}
                    small
                />
            </Parameter>
            <Parameter name="Block height">
                <Link
                    className={classNames(
                        'inline-flex items-center gap-1 text-inherit',
                        'hover:text-primary-light'
                    )}
                    href={`/block/${props.transaction.blockHeight}`}
                >
                    {formatNumber(props.transaction.blockHeight)}
                    <Link2Icon className="text-text-primary ml-1" size={12} />
                </Link>
            </Parameter>
            <Parameter name="Time">
                {dayjs(props.transaction.timestamp).format(
                    'YYYY-MM-DD HH:mm:ss z'
                )}
            </Parameter>
        </Parameters>
        {props.transaction.memo && <Memo />}
        <ActionHistory
            blockHeight={props.transaction.blockHeight}
            hash={props.transaction.hash}
            rawTransaction={props.transaction.raw}
        />
        <Subsection title="Parameters">
            <Parameters className="bg-other-tonalFill5 rounded-sm p-3">
                <Parameter name="Transaction fee">
                    {props.transaction.fee / 1000000} UM
                </Parameter>
                <Parameter name="Chain ID">
                    {props.transaction.chainId}
                </Parameter>
            </Parameters>
        </Subsection>
        <JsonTree data={props.transaction.rawJson} />
    </View>
)

export default TransactionView
