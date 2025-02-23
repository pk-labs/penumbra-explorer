import { FC } from 'react'
import { TransactionFragment } from '@/lib/graphql/generated/types'
import Subsection from '../subsection'
import Action from './action'
import styles from './actions.module.css'

interface Props {
    actions: TransactionFragment['body']['actions']
}

const Actions: FC<Props> = props => (
    <Subsection title="Actions">
        <ul className={styles.list}>
            {props.actions.map((action, i) => (
                <Action key={i}>{action.__typename}</Action>
            ))}
        </ul>
    </Subsection>
)

export default Actions
