'use client'

import clsx from 'clsx'
import { Search as SearchIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useCallback, useState } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { logo } from '@/lib/images'
import Modal from '../modal'
import Search from '../search'
import { Tab, Tabs } from '../tabs'
import styles from './navigationBar.module.css'

interface Props {
    className?: string
}

const NavigationBar: FC<Props> = props => {
    const pathname = usePathname()
    const [searchModalOpen, setSearchModalOpen] = useState(false)

    const openSearchModal = useCallback(() => setSearchModalOpen(true), [])

    const closeSearchModal = useCallback(() => setSearchModalOpen(false), [])

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
                    <>
                        <div
                            className={styles.search}
                            onClick={openSearchModal}
                        >
                            <SearchIcon size={16} />
                            Search
                        </div>
                        <Modal
                            className={styles.searchModal}
                            onClose={closeSearchModal}
                            open={searchModalOpen}
                        >
                            <GraphqlClientProvider>
                                <Search autoFocus />
                            </GraphqlClientProvider>
                        </Modal>
                    </>
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
