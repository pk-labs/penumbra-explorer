import Image from 'next/image'
import { FC } from 'react'
import { TransactionFragment } from '../../lib/graphql/generated/types'
import styles from './actionList.module.css'
import incognitoFull from './incognitoFull.svg'

interface Props {
    actions: TransactionFragment['body']['actions']
}

const ActionList: FC<Props> = props => {
    return (
        <div className={styles.root}>
            <h3 className={styles.title}>Actions</h3>
            <ul className={styles.list}>
                {props.actions.map((action, i) => (
                    <li key={i} className={styles.item}>
                        <Image
                            alt={action.__typename}
                            height={incognitoFull.height}
                            src={incognitoFull.src}
                            width={incognitoFull.width}
                        />
                        {action.__typename}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ActionList
