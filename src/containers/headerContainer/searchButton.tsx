'use client'

import { usePathname } from 'next/navigation'
import { FC, useCallback, useState } from 'react'
import { Button, Modal } from '@/components'
import { SearchContainer } from '@/containers'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { classNames } from '@/lib/utils'

const SearchButton: FC = () => {
    const pathname = usePathname()
    const [modalOpen, setModalOpen] = useState(false)

    const openModal = useCallback(() => setModalOpen(true), [])

    const closeModal = useCallback(() => setModalOpen(false), [])

    if (pathname === '/') {
        return
    }

    return (
        <>
            <Button
                className={classNames(
                    'relative z-40 rounded-full backdrop-blur-lg'
                )}
                density="compact"
                icon="Search"
                onClick={openModal}
            >
                Search
            </Button>
            <Modal
                className="z-50 items-start pt-28"
                onClose={closeModal}
                open={modalOpen}
                closeButton
            >
                <GraphqlClientProvider>
                    <SearchContainer
                        className="w-[calc(100%-32px)]"
                        onBlur={closeModal}
                        autoFocus
                    />
                </GraphqlClientProvider>
            </Modal>
        </>
    )
}

export default SearchButton
