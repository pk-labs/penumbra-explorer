import Image from 'next/image'
import { FC } from 'react'
import { encrypted } from '@/lib/images'
import styles from './action.module.css'

interface Props {
    // TODO: Implement encrypted flag for icon
    children: string
}

const Action: FC<Props> = props => (
    <li className={styles.root}>
        <Image alt={props.children} src={encrypted} />
        {props.children}
    </li>
)

export default Action
