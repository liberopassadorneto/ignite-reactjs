import { Logo } from '@/components/Logo';
import { globalStyles } from '@/styles/global';
import { Container, Header } from '@/styles/pages/app';
import { AppProps } from 'next/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Logo />
      </Header>

      <Component {...pageProps} />
    </Container>
  );
}
