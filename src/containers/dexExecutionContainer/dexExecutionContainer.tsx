// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton, Surface } from '@/components'
import { classNames } from '@/lib/utils'
import DexExecutionLoader from './dexExecutionLoader'

export interface Props {
    className?: string
}

const DexExecutionContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <Surface
                as="section"
                className={classNames(
                    'flex flex-col gap-10 p-6 lg:w-[550px]',
                    props.className
                )}
            >
                <h2 className="text-2xl font-medium">Latest executions</h2>
                <Skeleton className="h-44 rounded-sm lg:h-full" />
            </Surface>
        }
    >
        <DexExecutionLoader {...props} />
    </Suspense>
)

export default DexExecutionContainer
