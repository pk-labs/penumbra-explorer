import Image from 'next/image'
import { FC, ReactNode } from 'react'
import incognitoFull from '../actionList/incognitoFull.svg'
import styles from './memo.module.css'

interface Props {
    children?: ReactNode
}

const Memo: FC<Props> = props => {
    return (
        <div className={styles.root}>
            <h3 className={styles.title}>Memo</h3>
            <div className={styles.content}>
                <Image
                    alt="Memo"
                    className={styles.icon}
                    height={incognitoFull.height}
                    src={incognitoFull.src}
                    width={incognitoFull.width}
                />
                <span className={styles.memo}>{props.children}</span>
            </div>
        </div>
    )
}

export default Memo
