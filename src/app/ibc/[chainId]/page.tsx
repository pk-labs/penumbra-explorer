// istanbul ignore file
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import { ibcConnections } from '@/lib/constants'
import { classNames, generatePageMetadata } from '@/lib/utils'

interface Props {
    params: Promise<{ chainId: string }>
}

export const generateMetadata = async (props: Props) => {
    const { chainId } = await props.params

    return generatePageMetadata(
        `Chain ${chainId}`,
        'TODO: Description',
        `/ibc/${chainId}`
    )
}

const ChainPage: FC<Props> = async props => {
    const params = await props.params

    const connection = ibcConnections.find(
        connection => connection.chainId === params.chainId
    )

    if (!connection) {
        notFound()
    }

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb href="/ibc">IBC Chains</Breadcrumb>
            </Breadcrumbs>
            <div
                className={classNames(
                    'bg-other-tonalFill5 flex flex-col gap-3 rounded-lg p-6',
                    'backdrop-blur-[32px]'
                )}
            >
                <h1
                    className={classNames(
                        'font-heading flex items-center gap-2 text-4xl',
                        'font-medium'
                    )}
                >
                    <Image
                        alt={connection.name}
                        height={32}
                        src={connection.image}
                        width={32}
                    />
                    {connection.name}
                </h1>
                <div
                    className={classNames(
                        'flex flex-col gap-1 font-mono text-sm font-medium'
                    )}
                >
                    <div>
                        <span className="text-text-secondary">chain-id </span>
                        <span>{connection.chainId}</span>
                    </div>
                    <div>
                        <span className="text-text-secondary">client-id </span>
                        <span>???</span>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ChainPage
