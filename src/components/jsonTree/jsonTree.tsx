'use client'

import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { FC, useCallback, useState } from 'react'
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
        <Subsection title="Raw JSON">
            <div
                className={clsx(
                    'rounded-lg bg-(--surface) p-3 font-mono text-xs',
                    'font-medium break-all'
                )}
                onClick={onClick}
            >
                <ReactJsonView
                    // Expand two levels when expanding for the first time
                    collapsed={clicked ? 2 : true}
                    src={props.data}
                    style={{ background: 'transparent' }}
                    theme="twilight"
                />
            </div>
        </Subsection>
    )
}

export default JsonTree
