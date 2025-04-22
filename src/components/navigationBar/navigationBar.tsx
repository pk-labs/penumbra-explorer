'use client'

import {
    BoxIcon,
    CheckCheckIcon,
    HomeIcon,
    SatelliteDishIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useCallback, useState } from 'react'
import { UmPriceContainer } from '@/containers'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { logo } from '@/lib/images'
import { classNames } from '@/lib/utils'
import Button from '../button'
import Container from '../container'
import { Menu, MenuItem } from '../menu'
import Modal from '../modal'
import Search from '../search'
import { Tab, Tabs } from '../tabs'

interface Props {
    className?: string
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

    // istanbul ignore next
    const openMenu = useCallback(() => {
        closeSearchModal()
        setMenuOpen(true)
    }, [closeSearchModal])

    return (
        <Container
            as="header"
            className={classNames(
                'grid h-19 grid-cols-2 items-center lg:grid-cols-3',
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
            <Tabs className="hidden justify-self-center lg:flex">
                <Tab href="/">Home</Tab>
                <Tab href="/blocks" paths={['/block']}>
                    Blocks
                </Tab>
                <Tab href="/txs" paths={['/tx']}>
                    Transactions
                </Tab>
                <Tab href="/ibc" paths={['/ibc']}>
                    IBC
                </Tab>
            </Tabs>
            <div className="flex items-center gap-2 justify-self-end">
                {pathname !== '/' && (
                    <>
                        <Button
                            className="relative z-40 rounded-full backdrop-blur-[32px]"
                            density="compact"
                            icon="Search"
                            onClick={openSearchModal}
                        >
                            Search
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
                <UmPriceContainer className="hidden sm:flex" />
                <Menu
                    className={classNames(
                        'relative z-40 rounded-full backdrop-blur-[32px]',
                        'lg:hidden'
                    )}
                    onClose={closeMenu}
                    onOpen={openMenu}
                    open={menuOpen}
                >
                    <UmPriceContainer className="ml-4 self-start sm:hidden" />
                    <MenuItem href="/">
                        <HomeIcon className="stroke-primary-light" size={16} />
                        Home
                    </MenuItem>
                    <MenuItem href="/blocks" paths={['/block']}>
                        <BoxIcon className="stroke-primary-light" size={16} />
                        Blocks
                    </MenuItem>
                    <MenuItem href="/txs" paths={['/tx']}>
                        <CheckCheckIcon
                            className="stroke-primary-light"
                            size={16}
                        />
                        Transactions
                    </MenuItem>
                    <MenuItem href="/ibc" paths={['/ibc']}>
                        <SatelliteDishIcon
                            className="stroke-primary-light"
                            size={16}
                        />
                        IBC
                    </MenuItem>
                </Menu>
            </div>
        </Container>
    )
}

export default NavigationBar
