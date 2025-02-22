import Image from 'next/image'
import { FC } from 'react'
import { encrypted } from '@/lib/images'
import styles from './memo.module.css'

const Memo: FC = () => (
    <div className={styles.root}>
        <h3 className={styles.title}>Memo</h3>
        <div className={styles.content}>
            <Image
                alt="Memo"
                height={encrypted.height}
                src={encrypted.src}
                width={encrypted.width}
            />
            <span>Memo</span>
        </div>
    </div>
)

export default Memo
