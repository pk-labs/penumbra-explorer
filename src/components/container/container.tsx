import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import styles from './container.module.css';

interface Props {
  children?: ReactNode;
  className?: string;
  narrow?: boolean;
}

const Container: FC<Props> = props => (
  <div className={clsx(styles.root, props.narrow && styles.narrow, props.className)}>
    {props.children}
  </div>
);

export default Container;
