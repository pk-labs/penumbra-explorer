/* istanbul ignore file */
import Image from 'next/image'
import { FC } from 'react'
import { TransactionFragment } from '@/lib/graphql/generated/types'
import { encrypted } from '@/lib/images'
import styles from './action.module.css'

export interface Props {
    action: TransactionFragment['body']['actions'][number]
}

const Action: FC<Props> = props => (
    <li className={styles.root}>
        <Image
            alt={props.action.__typename}
            height={encrypted.height}
            src={encrypted.src}
            width={encrypted.width}
        />
        {props.action.__typename}
    </li>
)

export default Action
