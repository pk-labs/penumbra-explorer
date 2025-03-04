'use client'

import clsx from 'clsx'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { logo } from '@/lib/images'
import { Tab, Tabs } from '../tabs'
import styles from './navigationBar.module.css'

interface Props {
    className?: string
}

const NavigationBar: FC<Props> = props => {
    const pathname = usePathname()

    return (
        <header className={clsx(styles.root, props.className)}>
            <div className={styles.group}>
                <Link href="/">
                    <Image
                        alt="Noctis"
                        height={33}
                        src={logo.src}
                        width={120}
                    />
                </Link>
            </div>
            <Tabs className={styles.tabs}>
                <Tab href="/">Home</Tab>
                <Tab href="/blocks" paths={['/block']}>
                    Blocks
                </Tab>
                <Tab href="/txs" paths={['/tx']}>
                    Transactions
                </Tab>
            </Tabs>
            <div className={styles.group}>
                {pathname !== '/' && (
                    <div className={styles.search}>
                        <Search size={16} />
                        <span>Search</span>
                    </div>
                )}
                <div className={styles.price}>
                    <span className={styles.label}>UM Price:</span>
                    <span>$0.98</span>
                    <span className={styles.movement}>(+1.1%)</span>
                </div>
            </div>
        </header>
    )
}

export default NavigationBar
