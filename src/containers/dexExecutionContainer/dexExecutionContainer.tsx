// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton } from '@/components'
import { classNames } from '@/lib/utils'
import DexExecutionLoader from './dexExecutionLoader'

export interface Props {
    className?: string
}

const DexExecutionContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <section
                className={classNames(
                    'bg-other-tonalFill5 flex flex-col gap-10 rounded-lg p-6',
                    'backdrop-blur-lg',
                    props.className
                )}
            >
                <h2 className="text-2xl font-medium">Latest executions</h2>
                <Skeleton className="h-full rounded-sm" />
            </section>
        }
    >
        <DexExecutionLoader {...props} />
    </Suspense>
)

export default DexExecutionContainer
