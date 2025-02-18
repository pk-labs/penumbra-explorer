import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import styles from './pill.module.css';

interface Props {
  children: ReactNode;
  className?: string;
}

const Pill: FC<Props> = props => (
  <span className={clsx(styles.root, props.className)}>{props.children}</span>
);

export default Pill;
