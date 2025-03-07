import { FC } from 'react'
import Subsection from '../subsection'
import Action from './action'
import styles from './actions.module.css'

interface Props {
    actions: string[]
}

const Actions: FC<Props> = props => (
    <Subsection title="Actions">
        <ul className={styles.list}>
            {props.actions.map((action, i) => (
                <Action key={i}>{action}</Action>
            ))}
        </ul>
    </Subsection>
)

export default Actions
