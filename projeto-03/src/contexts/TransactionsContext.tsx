import { createContext, ReactNode, useEffect, useState } from 'react';
import { z } from 'zod';

const transactionSchema = z.object({
  id: z.number(),
  description: z.string(),
  type: z.enum(['income', 'outcome']),
  category: z.string(),
  price: z.number(),
  createdAt: z.string(),
});

type Transaction = z.infer<typeof transactionSchema>;

const transactionsContextSchema = z.object({
  transactions: z.array(transactionSchema),
});

type TransactionsContextType = z.infer<typeof transactionsContextSchema>;

export const TransactionsContext = createContext({} as TransactionsContextType);

interface TransactionProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    const response = await fetch('http://localhost:3030/transactions');
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
