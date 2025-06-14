// istanbul ignore file
'use client'

import { FC } from 'react'
import { EmptyState } from '@/components'
import { classNames } from '@/lib/utils'
import Collapsible from '../../components/collapsible'
import { Props as DexPositionTableContainerProps } from './dexExecutionContainer'

interface Props extends DexPositionTableContainerProps {
    executions?: any[]
}

const DexExecutionUpdater: FC<Props> = props => {
    // const [positions] = useState(props.positions)
    // const [blockSubscription] = useBlockUpdateSubscription({
    //     pause: !subscription,
    //     variables: { limit: limit.length },
    // })
    // const blockUpdate = blockSubscription.data?.latestBlocks

    // useEffect(() => {
    //     if (blockUpdate) {
    //         setBlocks(prev => {
    //             if (
    //                 !prev ||
    //                 prev.some(block => blockUpdate.height === block.height)
    //             ) {
    //                 return prev
    //             }
    //
    //             return [
    //                 {
    //                     height: blockUpdate.height,
    //                     timestamp: dayjs(blockUpdate.createdAt).valueOf(),
    //                     transactionsCount: blockUpdate.transactionsCount,
    //                 },
    //                 ...prev.slice(0, -1),
    //             ]
    //         })
    //     }
    // }, [blockUpdate])

    return (
        <section
            className={classNames(
                'bg-other-tonalFill5 flex flex-col gap-10 rounded-lg p-6',
                'backdrop-blur-lg',
                props.className
            )}
        >
            <h2 className="text-2xl font-medium">Latest executions</h2>
            {props.executions?.length ? (
                props.executions.map((execution, i) => (
                    <Collapsible
                        key={i}
                        header={
                            <>
                                <span>{execution.headerLeft}</span>
                                <span>{execution.headerRight}</span>
                            </>
                        }
                    >
                        {execution.content}
                    </Collapsible>
                ))
            ) : (
                <EmptyState title="No executions">Really</EmptyState>
            )}
        </section>
    )
}

export default DexExecutionUpdater
