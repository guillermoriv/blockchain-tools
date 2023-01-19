import { ContractReader } from '@/components/ContractReader';
import { Header } from '@/components/Header';
import { SideBar } from '@/components/SideBar';

export default function Home() {
  return (
    <main className="flex">
      <div className="w-80 h-screen border-r border-r-black p-4">
        <SideBar />
      </div>
      <div className="container flex flex-col">
        <Header />
        <ContractReader />
      </div>
    </main>
  );
}
