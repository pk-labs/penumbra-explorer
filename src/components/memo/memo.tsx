// istanbul ignore file
import Image from 'next/image'
import { FC } from 'react'
import { encrypted } from '@/lib/images'
import { classNames } from '@/lib/utils'
import Subsection from '../subsection'

const Memo: FC = () => (
    <Subsection title="Memo">
        <div
            className={classNames(
                'bg-other-tonalFill5 flex items-center gap-2 rounded-sm px-3',
                'text-text-secondary py-2 text-sm font-normal'
            )}
        >
            <Image alt="Memo" src={encrypted} />
            <span>Memo</span>
        </div>
    </Subsection>
)

export default Memo
