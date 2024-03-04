import HeroSection from '@/components/hero';
import Member from '@/components/member';
import Footer from '@/components/footer';

import TkjLayout from '@/layout/tkjLayout';

export default function Home() {
  return (
      <TkjLayout>
        <HeroSection />
        <Member/>
        <Footer/>
      </TkjLayout>
  );
}
