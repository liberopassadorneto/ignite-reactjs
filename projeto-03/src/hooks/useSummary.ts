import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '../contexts/TransactionsContext';
import { useMemo } from 'react';

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  // transactions => defaultValues: { income: 0, outcome: 0, total: 0 }
  // useMemo: memoriza o valor de uma variável, evitando que ela seja recalculada a cada renderização
  const summary = useMemo(() => {
    transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.price;
          acc.total += transaction.price;
        } else {
          acc.outcome += transaction.price;
          acc.total -= transaction.price;
        }

        return acc;
      },

      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
  }, [transactions]);

  return summary;
}
