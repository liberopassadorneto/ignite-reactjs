import * as Dialog from '@radix-ui/react-dialog';
import { Logo } from '../Logo';
import { NewTransactionModal } from '../NewTransactionModal';
import { HeaderContainer, HeaderContent, TransactionButton } from './styles';

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <TransactionButton>New transaction</TransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
