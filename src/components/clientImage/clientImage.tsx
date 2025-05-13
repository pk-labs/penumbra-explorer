import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { FC } from 'react'
import { classNames } from '@/lib/utils'

interface Props {
    alt?: string
    className?: string
    src?: StaticImport | string
}

const ClientImage: FC<Props> = props =>
    props.src ? (
        <Image
            alt={props.alt ?? ''}
            className={classNames('inline', props.className)}
            height={32}
            src={props.src}
            width={32}
        />
    ) : (
        <span
            className={classNames(
                'inline-block h-8 w-8 rounded-full bg-neutral-700',
                props.className
            )}
        />
    )

export default ClientImage
