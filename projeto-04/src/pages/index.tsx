import { stripe } from '@/libs/stripe';
import { HomeContainer, Product } from '@/styles/pages/home';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Stripe from 'stripe';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Product className="keen-slider__slide" key={product.id}>
            <Image
              src={product.imageUrl}
              width={520}
              height={480}
              alt="t-shirt"
            />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        );
      })}
    </HomeContainer>
  );
}

// é executado na build do projeto
// por isso, não é possível verificar se o usuário está logado, cookies, contexto de requisição (header, etc)
// a página será igual para todos os usuários
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    const priceUnitAmount = price.unit_amount ? price.unit_amount / 100 : 0;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(priceUnitAmount),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
