import { StaticImageData } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { FC } from 'react'
import { classNames, firstLetter } from '@/lib/utils'

// interface Props {
//     alt: string
//     className?: string
//     fallback?: StaticImageData | string
//     fallbackLetter?: boolean
//     src?: StaticImageData | string
// }

type Props = {
    alt: string
    className?: string
} & (
    | {
          fallback: StaticImageData | string
          fallbackLetter?: boolean
          src?: StaticImageData | string
      }
    | {
          fallback?: never
          fallbackLetter?: never
          src: StaticImageData | string
      }
)

const Avatar: FC<Props> = props => (
    <span
        className={classNames(
            'relative inline-block h-8 w-8 font-mono text-sm',
            'font-medium text-white capitalize',
            props.className
        )}
    >
        <Image
            alt={props.alt}
            className="rounded-full"
            src={(props.src ?? props.fallback)!}
        />
        {props.fallbackLetter && (
            <span
                className={classNames(
                    'absolute top-1/2 left-1/2 mt-[3px] -translate-1/2'
                )}
            >
                {firstLetter(props.alt)}
            </span>
        )}
    </span>
)

export default Avatar
