import { Logo } from '../Logo';
import { HeaderContainer, HeaderContent, TransactionButton } from './styles';

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo />
        <TransactionButton>New transaction</TransactionButton>
      </HeaderContent>
    </HeaderContainer>
  );
}
