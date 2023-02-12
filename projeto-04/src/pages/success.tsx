import { stripe } from '@/libs/stripe';
import { ImageContainer, SuccessContainer } from '@/styles/pages/success';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Stripe from 'stripe';

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Purchase successful | Ignite Shop</title>

        {/* Não indexar a página de success no Google */}
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Purchase successful</h1>

        <ImageContainer>
          <Image
            src={product.imageUrl}
            width={120}
            height={110}
            alt={product.name}
          />
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua{' '}
          <strong>{product.name}</strong> já está a caminho da sua casa.
        </p>

        <Link href="/">Back to home</Link>
      </SuccessContainer>
    </>
  );
}

/*
  * Fetching data:

  * Client-side: useEffect -> Daria para fazer, mas não é recomendado. Pois, a API do Stripe não aceita requisições do lado do cliente. Além disso, iria expor a chave da API do Stripe para o usuário.

  * getServerSideProps: SSR -> RECOMENDADO!

  * getStaticProps: SSG -> NÃO funciona, pois a página de success recebe params (query) dinâmicos. E o SSG não funciona com páginas dinâmicas.
 */

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const sessionId = query.session_id as string;

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  // Melhorar essa lógica
  if (!session) {
    return {
      notFound: true,
    };
  }

  const customerName = session.customer_details?.name;

  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};
