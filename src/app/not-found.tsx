/* istanbul ignore file */
import { Search } from 'lucide-react'
import { FC } from 'react'
import { Container } from '@/components'
import styles from './page.module.css'

const NotFoundPage: FC = async () => (
    <>
        <Container>
            <h1 className={styles.title}>Penumbra Blockchain Explorer</h1>
            <div className={styles.search}>
                <Search size={16} />
                <span>Search by address, hash number, blocks, etc.</span>
            </div>
        </Container>
        <div className={styles.notFound}>
            <span className={styles.status}>404</span>
            <span className={styles.separator} />
            <span>This page could not be found.</span>
        </div>
    </>
)

export default NotFoundPage
