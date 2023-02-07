import shirt1 from '@/assets/shirts/01.png';
import shirt2 from '@/assets/shirts/02.png';
import shirt3 from '@/assets/shirts/03.png';
import { HomeContainer, Product } from '@/styles/pages/home';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={shirt1} width={520} height={480} alt="shirt" />

        <footer>
          <strong>Shirt X</strong>
          <span>$ 59.90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt2} width={520} height={480} alt="shirt" />

        <footer>
          <strong>Shirt Y</strong>
          <span>$ 59.90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt3} width={520} height={480} alt="shirt" />

        <footer>
          <strong>Shirt Z</strong>
          <span>$ 59.90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt3} width={520} height={480} alt="shirt" />

        <footer>
          <strong>Shirt K</strong>
          <span>$ 59.90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}

export const getServerSideProps = () => {
  return {
    props: {
      list: [1, 2, 3],
    },
  };
};
