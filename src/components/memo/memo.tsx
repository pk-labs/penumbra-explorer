// istanbul ignore file
import { FC } from 'react'
import { Encrypted } from '@/components'
import { classNames } from '@/lib/utils'
import Subsection from '../subsection'

const Memo: FC = () => (
    <Subsection title="Memo">
        <div
            className={classNames(
                'bg-other-tonal-fill5 flex items-center gap-1 rounded-sm px-3',
                'text-text-secondary py-2'
            )}
        >
            <Encrypted />
            <span className="font-mono text-sm font-medium">Memo</span>
        </div>
    </Subsection>
)

export default Memo
