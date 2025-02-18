import { FC, ReactNode } from 'react';
import styles from './dataList.module.css';

export interface Props {
  children?: ReactNode;
  name: string;
}

const DataListItem: FC<Props> = props => (
  <li className={styles.item}>
    <span className={styles.name}>{props.name}</span>
    <span className={styles.separator} />
    {props.children}
  </li>
);

export default DataListItem;
