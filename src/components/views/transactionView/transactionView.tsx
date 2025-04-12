import { Link2Icon } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { TransformedTransactionFragment } from '@/lib/types'
import { shortenHash } from '@/lib/utils'
import Actions from '../../actions'
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
        className={twMerge(
            'from-[rgba(193,166,204,0.25)]!',
            'to-[rgba(193,166,204,0.03)]!',
            props.className
        )}
        subtitle={props.transaction.hash}
        title="Transaction view"
    >
        <Parameters>
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
                    className={twMerge(
                        'inline-flex items-center gap-1 text-inherit',
                        'hover:text-primary-light'
                    )}
                    href={`/block/${props.transaction.block.height}`}
                >
                    {props.transaction.block.height}
                    <Link2Icon className="text-text-primary ml-1" size={12} />
                </Link>
            </Parameter>
            <Parameter name="Time">
                {props.transaction.block.createdAt}
            </Parameter>
        </Parameters>
        {props.transaction.memo && <Memo />}
        <Actions
            blockHeight={props.transaction.block.height}
            chainId={props.transaction.body.parameters.chainId}
            hash={props.transaction.hash}
            rawTransaction={props.transaction.raw}
        />
        <Subsection title="Parameters">
            <Parameters>
                <Parameter name="Transaction fee">
                    <span className="text-destructive-light">
                        {Number(props.transaction.body.parameters.fee.amount) /
                            1000000}{' '}
                        UM
                    </span>
                </Parameter>
                <Parameter name="Chain ID">
                    {props.transaction.body.parameters.chainId}
                </Parameter>
            </Parameters>
        </Subsection>
        <JsonTree data={props.transaction.rawJson} />
    </View>
)

export default TransactionView
