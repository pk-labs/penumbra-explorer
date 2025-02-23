import { FC } from 'react'
import { TransactionFragment } from '@/lib/graphql/generated/types'
import { ActionItem } from './actionItem'
import styles from './actions.module.css'

interface Props {
    actions: TransactionFragment['body']['actions']
}

const Actions: FC<Props> = props => (
    <div className={styles.root}>
        <h3 className={styles.title}>Actions</h3>
        <ul className={styles.list}>
            {props.actions.map((action, i) => (
                <ActionItem key={i} action={action} />
            ))}
        </ul>
    </div>
)

export default Actions
