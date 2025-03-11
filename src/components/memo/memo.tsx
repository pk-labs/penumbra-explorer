// istanbul ignore file
import Image from 'next/image'
import { FC } from 'react'
import { encrypted } from '@/lib/images'
import Subsection from '../subsection'
import styles from './memo.module.css'

const Memo: FC = () => (
    <Subsection title="Memo">
        <div className={styles.content}>
            <Image alt="Memo" src={encrypted} />
            <span>Memo</span>
        </div>
    </Subsection>
)

export default Memo
