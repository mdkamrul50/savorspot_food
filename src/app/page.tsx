import Categories from '@/components/home/Categories';
import FeaturedExperiences from '@/components/home/FeaturedExperiences';
import HeroSlider from '@/components/home/HeroSlider';
import HowItWorks from '@/components/home/HowItWorks';
import NewsletterCTA from '@/components/home/NewsletterCTA';
import Statistics from '@/components/home/StatisticsChart';
import Testimonials from '@/components/home/Testimonials';
import TopHosts from '@/components/home/TopHosts';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="">
      <HeroSlider />
      <HowItWorks />
      <FeaturedExperiences />
      <Categories />
      <NewsletterCTA />
      <TopHosts />
      <Testimonials />
      <Statistics />
    </div>
  );
}
