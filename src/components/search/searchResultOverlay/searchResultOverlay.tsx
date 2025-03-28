'use client'

import { motion } from 'motion/react'
import { FC, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'
import { fastOutSlowIn } from '@/lib/constants'
import { SearchResultProps } from '../searchResult'

export interface Props {
    children?:
        | Array<
              | Array<ReactElement<SearchResultProps>>
              | false
              | null
              | ReactElement<SearchResultProps>
              | undefined
          >
        | ReactElement<SearchResultProps>
    title: string
}

const SearchResultOverlay: FC<Props> = props => (
    <motion.div
        animate={{ opacity: 1, transition: { duration: 0 } }}
        className={twMerge(
            'absolute top-16 z-10 flex w-full flex-col gap-4',
            'rounded-sm border border-(--surfaceLighter)',
            'bg-[rgba(34,99,98,0.1)] p-6 backdrop-blur-[32px]'
        )}
        exit={{
            opacity: 0,
            transition: { duration: 0.2, ease: fastOutSlowIn },
        }}
        initial={{ opacity: 0 }}
    >
        <h3 className="text-xs text-(--textSecondary)">{props.title}</h3>
        {props.children && (
            <ul className="flex flex-col font-mono text-sm font-medium">
                {props.children}
            </ul>
        )}
    </motion.div>
)

export default SearchResultOverlay
