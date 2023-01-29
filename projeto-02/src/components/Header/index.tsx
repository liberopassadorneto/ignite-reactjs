import { Scroll, Timer } from 'phosphor-react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo';
import { HeaderContainer } from './styles';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <nav>
        <NavLink to={'/'} title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to={'/history'} title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
