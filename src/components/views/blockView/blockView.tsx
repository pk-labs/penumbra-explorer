import clsx from 'clsx'
import { FC } from 'react'
import { BlockFragment } from '../../../lib/graphql/generated/types'
import { formatNumber } from '../../../lib/utils'
import { DataList, DataListItem } from '../../dataList'
import JsonTree from '../../jsonTree'
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
            <DataList>
                <DataListItem name="Block height">
                    {props.block.height}
                </DataListItem>
                <DataListItem name="Time">{props.block.createdAt}</DataListItem>
                {/*<DataListItem name="Proposer">*/}
                {/*    TODO: Proposer*/}
                {/*    <Copy color="var(--textSecondary)" size={14} />*/}
                {/*</DataListItem>*/}
                <DataListItem name="Proposer">-</DataListItem>
                {/*<DataListItem name="Txs">*/}
                {/*    {props.block.transactionsCount}*/}
                {/*</DataListItem>*/}
                <DataListItem name="Txs">-</DataListItem>
            </DataList>
            <JsonTree data={props.block} />
        </View>
    )
}

export default BlockView
