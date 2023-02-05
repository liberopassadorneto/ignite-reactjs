import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlass } from 'phosphor-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TransactionsContext } from '../../../../contexts/TransactionsContext';
import { SearchFormContainer } from './styles';

const searchFormSchema = z.object({
  query: z.string().min(3),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    // simulate a request with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Search transactions"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Find transaction
      </button>
    </SearchFormContainer>
  );
}
