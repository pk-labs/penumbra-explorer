import { StaticImageData } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { FC } from 'react'
import { classNames } from '@/lib/utils'
import unknownClient from './unknown-client.png'

interface Props {
    alt: string
    className?: string
    src?: StaticImageData | string
}

const ClientImage: FC<Props> = props => (
    <Image
        alt={props.alt}
        className={classNames('inline h-8 w-8 rounded-full', props.className)}
        src={props.src ?? unknownClient}
    />
)

export default ClientImage
