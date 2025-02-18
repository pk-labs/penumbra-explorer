/* istanbul ignore file */
import type { Metadata } from 'next';
import { FC } from 'react';
import { transactions } from '../../__tests__/__fixtures__';
import { Breadcrumb, Breadcrumbs, Container, TransactionTable } from '../../components';
import { rootTitle } from '../../lib/constants';

const paginatedTransactions = transactions.slice(0, 20);

export const metadata: Metadata = {
  title: `Transactions - ${rootTitle}`,
};

const TransactionsPage: FC = async () => (
  <Container>
    <Breadcrumbs>
      <Breadcrumb href='/'>Explorer</Breadcrumb>
      <Breadcrumb>Transactions</Breadcrumb>
    </Breadcrumbs>
    <TransactionTable transactions={paginatedTransactions} time />
  </Container>
);

export const revalidate = 1;
export default TransactionsPage;
