'use client'

import dynamic from 'next/dynamic'
import { FC } from 'react'
import styles from './jsonTree.module.css'

const ReactJsonView = dynamic(() => import('@microlink/react-json-view'), {
    ssr: false,
})

interface Props {
    data: object
}

const JsonTree: FC<Props> = props => (
    <div className={styles.root}>
        <h3 className={styles.title}>Raw JSON</h3>
        <div className={styles.container}>
            <ReactJsonView
                enableClipboard={false}
                src={props.data}
                style={{
                    background: 'transparent',
                }}
                theme="twilight"
                collapsed
            />
        </div>
    </div>
)

export default JsonTree
