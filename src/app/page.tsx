import Categories from '@/components/home/Categories';
import HeroSlider from '@/components/home/HeroSlider';
import HowItWorks from '@/components/home/HowItWorks';
import NewsletterCTA from '@/components/home/NewsletterCTA';
import Image from 'next/image';

export default function Home() {
  return (
    <div className=''>
    <HeroSlider />
    <HowItWorks />
    <Categories />
    <NewsletterCTA />
    </div>
  );
}
