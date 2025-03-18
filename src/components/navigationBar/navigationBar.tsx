'use client'

import { BoxIcon, CheckCheckIcon, HomeIcon, SearchIcon } from 'lucide-react'
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
import { Menu, MenuItem } from '../menu'
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
    const [menuOpen, setMenuOpen] = useState(false)

    const closeSearchModal = useCallback(() => setSearchModalOpen(false), [])

    const closeMenu = useCallback(() => setMenuOpen(false), [])

    const openSearchModal = useCallback(() => {
        closeMenu()
        setSearchModalOpen(true)
    }, [closeMenu])

    const openMenu = useCallback(() => {
        closeSearchModal()
        setMenuOpen(true)
    }, [closeSearchModal])

    return (
        <Container
            as="header"
            className={twMerge(
                'grid h-19 grid-cols-2 items-center md:grid-cols-3',
                props.className
            )}
        >
            <div className="relative z-40 flex items-center gap-2">
                <Link href="/">
                    <Image
                        alt="Noctis"
                        className="max-h-8 w-auto sm:max-h-none"
                        src={logo}
                        priority
                    />
                </Link>
            </div>
            <Tabs className="hidden justify-self-center md:flex">
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
                            className={twMerge(
                                'relative z-40 w-8 gap-1 px-0',
                                'backdrop-blur-[32px] sm:w-auto sm:px-4'
                            )}
                            onClick={openSearchModal}
                            light
                        >
                            <SearchIcon size={16} />
                            <span className="hidden sm:inline md:hidden lg:inline!">
                                Search
                            </span>
                        </Button>
                        <Modal
                            className="z-50 items-start pt-28"
                            onClose={closeSearchModal}
                            open={searchModalOpen}
                            closeButton
                        >
                            <GraphqlClientProvider>
                                <Search
                                    className="w-[calc(100%-32px)]"
                                    onBlur={closeSearchModal}
                                    autoFocus
                                />
                            </GraphqlClientProvider>
                        </Modal>
                    </>
                )}
                {props.umPrice && (
                    <div
                        className={twMerge(
                            'relative z-40 flex h-8 items-center',
                            'justify-center gap-0.5 rounded-full border-1',
                            'border-(--surfaceLighter) px-4 text-sm font-medium'
                        )}
                    >
                        <span
                            className={twMerge(
                                'hidden whitespace-nowrap',
                                'text-(--textSecondary) sm:inline md:hidden',
                                'lg:inline!'
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
                <Menu
                    className="relative z-40 md:hidden"
                    onClose={closeMenu}
                    onOpen={openMenu}
                    open={menuOpen}
                >
                    <MenuItem href="/">
                        <HomeIcon
                            className="stroke-(--primaryLight)"
                            size={16}
                        />
                        Home
                    </MenuItem>
                    <MenuItem href="/blocks" paths={['/block']}>
                        <BoxIcon
                            className="stroke-(--primaryLight)"
                            size={16}
                        />
                        Blocks
                    </MenuItem>
                    <MenuItem href="/txs" paths={['/tx']}>
                        <CheckCheckIcon
                            className="stroke-(--primaryLight)"
                            size={16}
                        />
                        Transactions
                    </MenuItem>
                </Menu>
            </div>
        </Container>
    )
}

export default NavigationBar
