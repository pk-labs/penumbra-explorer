import clsx from 'clsx';
import { Copy } from 'lucide-react';
import { FC } from 'react';
import { Transaction } from '../../../lib/types';
import { shortenHash } from '../../../lib/utils';
import { DataList, DataListItem } from '../../dataList';
import { View, ViewProps } from '../view';
import styles from './transactionView.module.css';

interface Props extends Omit<ViewProps, 'children'> {
  transaction: Transaction;
}

const TransactionView: FC<Props> = props => (
  <View
    title={props.title}
    subtitle={props.subtitle}
    className={clsx(styles.root, props.className)}
  >
    <DataList>
      <DataListItem name='Transaction hash'>
        {shortenHash(props.transaction.hash)}
        <Copy size={14} color='var(--textSecondary)' />
      </DataListItem>
      <DataListItem name='Block height'>{props.transaction.blockHeight}</DataListItem>
      <DataListItem name='Time'>{props.transaction.date}</DataListItem>
    </DataList>
  </View>
);

export default TransactionView;
