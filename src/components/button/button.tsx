'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import styles from './button.module.css';

interface Props {
  children?: ReactNode;
  className?: string;
  href?: string;
  light?: boolean;
}

const Button: FC<Props> = props =>
  props.href ? (
    <Link
      href={props.href}
      className={clsx(styles.root, props.light && styles.light, props.className)}
    >
      {props.children}
    </Link>
  ) : (
    <button
      className={clsx(styles.root, props.light && styles.light, props.className)}
      type='button'
    >
      {props.children}
    </button>
  );

export default Button;
