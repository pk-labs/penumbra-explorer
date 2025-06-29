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
                    'backdrop-blur-lg lg:w-[550px]',
                    props.className
                )}
            >
                <h2 className="text-2xl font-medium">Latest executions</h2>
                <Skeleton className="h-44 rounded-sm lg:h-full" />
            </section>
        }
    >
        <DexExecutionLoader {...props} />
    </Suspense>
)

export default DexExecutionContainer
