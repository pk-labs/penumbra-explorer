'use client'

import ReactJsonView from '@microlink/react-json-view'
import { FC } from 'react'
import styles from './jsonTree.module.css'

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
            />
        </div>
    </div>
)

export default JsonTree
