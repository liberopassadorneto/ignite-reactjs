import { createContext, ReactNode, useEffect, useState } from 'react';
import { z } from 'zod';
import { api } from '../libs/axios';

const transactionSchema = z.object({
  id: z.number(),
  description: z.string(),
  type: z.enum(['income', 'outcome']),
  category: z.string(),
  price: z.number(),
  createdAt: z.string(),
});

type Transaction = z.infer<typeof transactionSchema>;

type CreateTransactionData = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionData) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

interface TransactionProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    });

    setTransactions(response.data);
  }

  async function createTransaction(data: CreateTransactionData) {
    const { category, description, price, type } = data;

    const response = await api.post('/transactions', {
      category,
      description,
      price,
      type,
      createdAt: new Date(),
    });

    setTransactions((oldTransactions) => [response.data, ...oldTransactions]);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
