import HeroSection from '@/components/hero';
import Member from '@/components/member';
import Footer from '@/components/footer';

import Tkj2Layout from '@/layout/tkj2layout';

export default function Home() {
  return (
      <Tkj2Layout>
        <HeroSection />
        <Member/>
        <Footer/>
      </Tkj2Layout>
  );
}
