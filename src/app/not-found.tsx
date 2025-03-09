// istanbul ignore file
import { FC } from 'react'
import styles from './page.module.css'

const NotFoundPage: FC = async () => (
    <div className={styles.notFound}>
        <span className={styles.status}>404</span>
        <span className={styles.separator} />
        <span>This page could not be found.</span>
    </div>
)

export default NotFoundPage
