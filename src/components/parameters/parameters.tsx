import { FC } from 'react'
import { TransactionFragment } from '../../lib/graphql/generated/types'
import { DataList, DataListItem } from '../dataList'
import styles from './parameters.module.css'

interface Props {
    parameters: TransactionFragment['body']['parameters']
}

const Parameters: FC<Props> = props => (
    <div className={styles.root}>
        <h3 className={styles.title}>Parameters</h3>
        <DataList>
            <DataListItem name="Transaction fee">
                {Number(props.parameters.fee.amount) / 1000} UM
            </DataListItem>
            <DataListItem name="Chain ID">
                {props.parameters.chainId}
            </DataListItem>
        </DataList>
    </div>
)

export default Parameters
