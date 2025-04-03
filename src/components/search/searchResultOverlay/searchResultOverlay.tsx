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
    title?: string
}

const SearchResultOverlay: FC<Props> = props => (
    <motion.div
        animate={{ opacity: 1, transition: { duration: 0 } }}
        className={twMerge(
            'border-other-tonalStroke bg-other-dialogBackground absolute',
            'top-16 z-10 flex w-full flex-col gap-2 rounded-sm border px-2',
            'py-3 backdrop-blur-[32px]'
        )}
        exit={{
            opacity: 0,
            transition: { duration: 0.2, ease: fastOutSlowIn },
        }}
        initial={{ opacity: 0 }}
    >
        {props.title && (
            <h3 className="text-text-secondary px-2 py-1 text-sm">
                {props.title}
            </h3>
        )}
        {props.children}
    </motion.div>
)

export default SearchResultOverlay
