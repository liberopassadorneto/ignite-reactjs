import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';
import { useTheme } from 'styled-components';
import { useSummary } from '../../hooks/useSummary';
import { priceFormatter } from '../../utils/formatter';
import { SummaryCard, SummaryContainer } from './styles';

export function Summary() {
  const theme = useTheme();
  const summary = useSummary();

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Incomes</span>
          <ArrowCircleUp size={32} color={theme['green-300']} />
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Outcomes</span>
          <ArrowCircleDown size={32} color={theme['red-300']} />
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color={theme['white']} />
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
