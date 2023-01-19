import { ContractReader } from '@/components/ContractReader';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SideBar } from '@/components/SideBar';

export default function Home() {
  return (
    <main className="flex max-h-screen max-w-screen">
      <div className="w-80 h-screen border-r border-r-black p-4">
        <SideBar />
      </div>
      <div className="container flex flex-col">
        <Header />
        <ContractReader />
        <Footer />
      </div>
    </main>
  );
}
