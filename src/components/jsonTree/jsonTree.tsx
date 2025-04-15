'use client'

import dynamic from 'next/dynamic'
import { FC, useCallback, useState } from 'react'
import { classNames } from '@/lib/utils'
import CopyToClipboard from '../copyToClipboard'
import Subsection from '../subsection'

const ReactJsonView = dynamic(() => import('@microlink/react-json-view'), {
    ssr: false,
})

interface Props {
    data: object
}

const JsonTree: FC<Props> = props => {
    const [clicked, setClicked] = useState(false)

    const onClick = useCallback(() => setClicked(true), [])

    return (
        <Subsection
            title={
                <>
                    <span>Raw JSON</span>
                    <CopyToClipboard
                        text={JSON.stringify(props.data, null, 2)}
                        small
                    />
                </>
            }
        >
            <div
                className={classNames(
                    'bg-other-tonalFill5 rounded-sm p-3 font-mono text-xs',
                    'font-medium break-all'
                )}
                onClick={onClick}
            >
                <ReactJsonView
                    // Expand two levels when expanding for the first time
                    collapsed={clicked ? 2 : true}
                    enableClipboard={false}
                    src={props.data}
                    style={{ background: 'transparent' }}
                    theme="twilight"
                />
            </div>
        </Subsection>
    )
}

export default JsonTree
