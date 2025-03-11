'use client'

import clsx from 'clsx'
import { Search as SearchIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useCallback, useState } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { logo } from '@/lib/images'
import { UmPrice } from '@/lib/types'
import Modal from '../modal'
import Search from '../search'
import { Tab, Tabs } from '../tabs'
import styles from './navigationBar.module.css'

interface Props {
    className?: string
    umPrice?: UmPrice
}

const NavigationBar: FC<Props> = props => {
    const pathname = usePathname()
    const [searchModalOpen, setSearchModalOpen] = useState(false)

    const openSearchModal = useCallback(() => setSearchModalOpen(true), [])

    const closeSearchModal = useCallback(() => setSearchModalOpen(false), [])

    return (
        <header className={clsx(styles.root, props.className)}>
            <div className={styles.group}>
                <Link className={styles.logo} href="/">
                    <Image
                        alt="Noctis"
                        height={36}
                        src={logo.src}
                        width={142}
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
                                <Search onBlur={closeSearchModal} autoFocus />
                            </GraphqlClientProvider>
                        </Modal>
                    </>
                )}
                {props.umPrice && (
                    <div className={styles.price}>
                        <span className={styles.label}>UM Price:</span>
                        <span>${props.umPrice.price.toFixed(2)}</span>
                        <span
                            className={clsx(
                                props.umPrice.change > 0 && styles.positive,
                                props.umPrice.change < 0 && styles.negative
                            )}
                        >
                            ({props.umPrice.change > 0 && '+'}
                            {props.umPrice.change.toFixed(1)}%)
                        </span>
                    </div>
                )}
            </div>
        </header>
    )
}

export default NavigationBar
