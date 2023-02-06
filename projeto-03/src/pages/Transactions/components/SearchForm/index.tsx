import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlass } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { useContextSelector } from 'use-context-selector';
import { z } from 'zod';
import { TransactionsContext } from '../../../../contexts/TransactionsContext';
import { SearchFormContainer } from './styles';

/**
 * Por que um componente renderiza no React?
 * - Hooks changed (mudo estado, contexto, reducer, etc)
 * - Props changed (mudam as props do componente)
 * - Parent component re-rendered (o componente pai renderizou novamente)
 *
 * Qual o fluxo de renderização do React?
 * 1. React recria o HTML da interface daquele componente
 * 2. React compara o HTML recriado com a versão anterior
 * 3. SE houver diferenças, o React atualiza o HTML na tela
 *
 * Memo: na maioria das vezes, é mais lento que o React comparar o HTML
 * 0. Hooks changed, Props changed (deep comparison)
 * 0.1. Comparar a versão anterior dos hooks e props
 * 0.2. SE mudou algo, ele vai permitir uma nova renderização
 * Voltar para o fluxo normal
 */

const searchFormSchema = z.object({
  query: z.string().min(3),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions;
    },
  );

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

// export const SearchForm = memo(SearchFormComponent);
