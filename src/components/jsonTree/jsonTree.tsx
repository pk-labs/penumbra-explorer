'use client'

import dynamic from 'next/dynamic'
import { FC } from 'react'
import Subsection from '../subsection'
import styles from './jsonTree.module.css'

const ReactJsonView = dynamic(() => import('@microlink/react-json-view'), {
    ssr: false,
})

interface Props {
    data: object
}

const JsonTree: FC<Props> = props => (
    <Subsection title="Raw JSON">
        <div className={styles.container}>
            <ReactJsonView
                collapsed={2}
                src={props.data}
                style={{
                    background: 'transparent',
                }}
                theme="twilight"
            />
        </div>
    </Subsection>
)

export default JsonTree
