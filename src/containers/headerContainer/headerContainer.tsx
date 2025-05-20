import Link from 'next/link'
import { FC } from 'react'
import { Container, Logo, Tab, Tabs } from '@/components'
import { classNames } from '@/lib/utils'
import UmPriceContainer from '../umPriceContainer'
import MobileMenu from './mobileMenu'
import SearchButton from './searchButton'

interface Props {
    className?: string
}

const HeaderContainer: FC<Props> = props => (
    <Container
        as="header"
        className={classNames(
            'grid h-19 grid-cols-2 items-center lg:grid-cols-3',
            props.className
        )}
    >
        <div className="relative z-40 flex items-center gap-2">
            <Link href="/">
                <Logo className="max-h-6 w-auto sm:max-h-7" />
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
            <SearchButton />
            <UmPriceContainer className="hidden sm:flex" />
            <MobileMenu />
        </div>
    </Container>
)

export default HeaderContainer
