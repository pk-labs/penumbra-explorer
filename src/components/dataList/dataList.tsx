import clsx from 'clsx'
import { FC, ReactElement } from 'react'
import styles from './dataList.module.css'
import { Props as DataListItemProps } from './dataListItem'

interface Props {
    children:
        | Array<
              | Array<ReactElement<DataListItemProps>>
              | false
              | null
              | ReactElement<DataListItemProps>
              | undefined
          >
        | ReactElement<DataListItemProps>
    className?: string
    href?: string
    light?: boolean
}

const DataList: FC<Props> = props => (
    <ul className={clsx(styles.root, props.className)}>{props.children}</ul>
)

export default DataList
