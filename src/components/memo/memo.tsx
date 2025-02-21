import Image from 'next/image'
import { FC } from 'react'
import incognitoFull from '../actionList/incognitoFull.svg'
import styles from './memo.module.css'

const Memo: FC = () => (
    <div className={styles.root}>
        <h3 className={styles.title}>Memo</h3>
        <div className={styles.content}>
            <Image
                alt="Memo"
                height={incognitoFull.height}
                src={incognitoFull.src}
                width={incognitoFull.width}
            />
            <span>Memo</span>
        </div>
    </div>
)

export default Memo
