import HeroSlider from '@/components/home/HeroSlider';
import HowItWorks from '@/components/home/HowItWorks';
import Image from 'next/image';

export default function Home() {
  return (
    <div className=''>
    <HeroSlider />
    <HowItWorks />
    </div>
  );
}
