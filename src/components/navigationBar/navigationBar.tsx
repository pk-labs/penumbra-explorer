import clsx from 'clsx'
import { ChevronsUpDown, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { logo } from '@/lib/images'
import { Tab, Tabs } from '../tabs'
import styles from './navigationBar.module.css'

interface Props {
    className?: string
}

const NavigationBar: FC<Props> = props => (
    <header className={clsx(styles.root, props.className)}>
        <div className={styles.group}>
            <Link href="/">
                <Image alt="Noctis" height={33} src={logo.src} width={120} />
            </Link>
            <div className={styles.dropdown}>
                <span>Mainnet</span>
                <ChevronsUpDown size={16} />
            </div>
        </div>
        <Tabs className={styles.tabs}>
            <Tab href="/" label="Home" />
            <Tab href="/blocks" label="Blocks" />
            <Tab href="/transactions" label="Transactions" />
        </Tabs>
        <div className={styles.group}>
            <div className={styles.search}>
                <Search size={16} />
                <span>Search</span>
            </div>
            <div className={styles.price}>
                <span className={styles.label}>UM Price:</span>
                <span>$0.98</span>
                <span className={styles.movement}>(+1.1%)</span>
            </div>
        </div>
    </header>
)

export default NavigationBar
