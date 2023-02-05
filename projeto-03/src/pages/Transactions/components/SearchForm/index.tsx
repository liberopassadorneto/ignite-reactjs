import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlass } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SearchFormContainer } from './styles';

const searchFormSchema = z.object({
  query: z.string().min(3),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    // simulate a request with delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(data);
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
