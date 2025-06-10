'use client'

import {
    AlignHorizontalDistributeCenterIcon,
    BlocksIcon,
    BoxIcon,
    CheckCheckIcon,
    HomeIcon,
    SatelliteDishIcon,
} from 'lucide-react'
import { FC, ReactNode, useCallback, useState } from 'react'
import { Menu, MenuItem } from '@/components'
import { classNames } from '@/lib/utils'

interface Props {
    children?: ReactNode
}

const MobileMenu: FC<Props> = props => {
    const [menuOpen, setMenuOpen] = useState(false)

    const openMenu = useCallback(() => setMenuOpen(true), [])

    const closeMenu = useCallback(() => setMenuOpen(false), [])

    return (
        <Menu
            className={classNames(
                'relative z-40 rounded-full backdrop-blur-lg',
                'lg:hidden'
            )}
            onClose={closeMenu}
            onOpen={openMenu}
            open={menuOpen}
        >
            {props.children}
            <MenuItem href="/">
                <HomeIcon className="stroke-primary-light" size={16} />
                Home
            </MenuItem>
            <MenuItem href="/blocks" paths={['/block']}>
                <BoxIcon className="stroke-primary-light" size={16} />
                Blocks
            </MenuItem>
            <MenuItem href="/txs" paths={['/tx']}>
                <CheckCheckIcon className="stroke-primary-light" size={16} />
                Transactions
            </MenuItem>
            <MenuItem href="/ibc" paths={['/ibc']}>
                <SatelliteDishIcon className="stroke-primary-light" size={16} />
                IBC
            </MenuItem>
            <MenuItem href="/validators" paths={['/validator']}>
                <BlocksIcon className="stroke-primary-light" size={16} />
                Validators
            </MenuItem>
            <MenuItem href="/dex">
                <AlignHorizontalDistributeCenterIcon
                    className="stroke-primary-light"
                    size={16}
                />
                DEX
            </MenuItem>
        </Menu>
    )
}

export default MobileMenu
