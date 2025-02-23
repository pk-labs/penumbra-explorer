import clsx from 'clsx'
import { FC } from 'react'
import { TransactionFragment } from '@/lib/graphql/generated/types'
import { shortenHash } from '@/lib/utils'
import Actions from '../../actions'
import CopyToClipboard from '../../copyToClipboard'
import JsonTree from '../../jsonTree'
import Memo from '../../memo'
import { Parameter, Parameters } from '../../parameters'
import Subsection from '../../subsection'
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
        <Parameters>
            <Parameter name="Transaction hash">
                {shortenHash(props.transaction.hash)}
                <CopyToClipboard data={props.transaction.hash} iconSize={14} />
            </Parameter>
            <Parameter name="Block height">
                {props.transaction.block.height}
            </Parameter>
            <Parameter name="Time">
                {props.transaction.block.createdAt}
            </Parameter>
        </Parameters>
        {props.transaction.body.memo && <Memo />}
        <Actions actions={props.transaction.body.actions} />
        <Subsection title="Parameters">
            <Parameters>
                <Parameter name="Transaction fee">
                    {Number(props.transaction.body.parameters.fee.amount) /
                        1000}{' '}
                    UM
                </Parameter>
                <Parameter name="Chain ID">
                    {props.transaction.body.parameters.chainId}
                </Parameter>
            </Parameters>
        </Subsection>
        <JsonTree data={props.transaction} />
    </View>
)

export default TransactionView
