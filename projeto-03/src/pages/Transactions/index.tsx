import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { SearchForm } from './components/SearchForm';
import { Price, TransactionsContainer, TransactionsTable } from './styles';

export function Transactions() {
  return (
    <>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Web development</td>
              <td>
                <Price variant="income">$ 12.000,00</Price>
              </td>
              <td>Job</td>
              <td>12/12/2020</td>
            </tr>

            <tr>
              <td width="50%">Supermarket</td>
              <td>
                <Price variant="outcome">$ 2.000,00</Price>
              </td>
              <td>Food</td>
              <td>12/12/2020</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  );
}
