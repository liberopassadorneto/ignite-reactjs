import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { Controller, useForm } from 'react-hook-form';
import { useContextSelector } from 'use-context-selector';
import { z } from 'zod';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  TransactionTypeItem,
  TransactionTypeRoot,
} from './styles';

const newTransactionFormSchema = z.object({
  description: z.string().min(3),
  price: z.number().min(0),
  category: z.string().min(3),
  type: z.enum(['income', 'outcome']),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction;
    },
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    // simulate a request with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { category, description, price, type } = data;

    createTransaction({
      category,
      description,
      price,
      type,
    });

    reset();
  }

  return (
    <Dialog.Portal>
      <DialogOverlay />

      <DialogContent>
        <Dialog.Title>New transaction</Dialog.Title>

        <DialogClose>
          <X size={24} />
        </DialogClose>

        <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Description"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Price"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Category"
            required
            {...register('category')}
          />

          <RadioGroup.Root></RadioGroup.Root>

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionTypeRoot
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeItem variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Income
                  </TransactionTypeItem>
                  <TransactionTypeItem variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Outcome
                  </TransactionTypeItem>
                </TransactionTypeRoot>
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Create transaction
          </button>
        </form>
      </DialogContent>
    </Dialog.Portal>
  );
}
