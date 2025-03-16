'use client'

import { Search as SearchIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useCallback, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { logo } from '@/lib/images'
import { UmPrice } from '@/lib/types'
import Button from '../button'
import Container from '../container'
import Modal from '../modal'
import Search from '../search'
import { Tab, Tabs } from '../tabs'

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
        <Container
            as="header"
            className={twMerge(
                'grid h-19 grid-cols-2 items-center lg:grid-cols-3',
                props.className
            )}
        >
            <div className="flex items-center gap-2">
                <Link href="/">
                    <Image alt="Noctis" height={36} src={logo} />
                </Link>
            </div>
            <Tabs className="hidden justify-self-center lg:flex">
                <Tab href="/">Home</Tab>
                <Tab href="/blocks" paths={['/block']}>
                    Blocks
                </Tab>
                <Tab href="/txs" paths={['/tx']}>
                    Transactions
                </Tab>
            </Tabs>
            <div className="flex items-center gap-2 justify-self-end">
                {pathname !== '/' && (
                    <>
                        <Button
                            className="w-8 gap-1 px-0 backdrop-blur-[32px] sm:w-auto sm:px-4"
                            onClick={openSearchModal}
                            light
                        >
                            <SearchIcon size={16} />
                            <span className="hidden sm:inline">Search</span>
                        </Button>
                        <Modal
                            className="items-start pt-28"
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
                    <div
                        className={twMerge(
                            'flex h-8 items-center justify-center gap-0.5',
                            'rounded-full border-1 border-(--surfaceLighter)',
                            'px-4 text-sm font-medium'
                        )}
                    >
                        <span
                            className={twMerge(
                                'hidden whitespace-nowrap sm:inline',
                                'text-(--textSecondary)'
                            )}
                        >
                            UM Price:
                        </span>
                        <span>${props.umPrice.price.toFixed(2)}</span>
                        <span
                            className={twMerge(
                                props.umPrice.change > 0 &&
                                    'text-(--positiveLight)',
                                props.umPrice.change < 0 &&
                                    'text-(--negativeLight)'
                            )}
                        >
                            ({props.umPrice.change > 0 && '+'}
                            {props.umPrice.change.toFixed(1)}%)
                        </span>
                    </div>
                )}
            </div>
        </Container>
    )
}

export default NavigationBar
