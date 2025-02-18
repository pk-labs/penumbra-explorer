import Link from 'next/link';
import { FC } from 'react';
import styles from './breadcrumbs.module.css';

export interface Props {
  children: string;
  href?: string;
  last?: boolean;
}

const Breadcrumb: FC<Props> = props =>
  props.href ? (
    <Link href={props.href} className={styles.breadcrumb}>
      {props.children}
    </Link>
  ) : (
    <span className={styles.breadcrumb}>{props.children}</span>
  );

export default Breadcrumb;
