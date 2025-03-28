// istanbul ignore file
import Image from 'next/image'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { encrypted } from '@/lib/images'
import Subsection from '../subsection'

const Memo: FC = () => (
    <Subsection title="Memo">
        <div
            className={twMerge(
                'flex items-center gap-2 rounded-sm bg-(--surface) px-3 py-2',
                'text-sm font-normal text-(--textSecondary)'
            )}
        >
            <Image alt="Memo" src={encrypted} />
            <span>Memo</span>
        </div>
    </Subsection>
)

export default Memo
