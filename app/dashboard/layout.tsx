import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { TRPCReactProvider } from '@/trpc/react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard Starter',
  description: 'Basic dashboard'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <TRPCReactProvider>
        <Sidebar />
        <main className="w-full flex-1 overflow-hidden">
          <Header />
          {children}
        </main>
      </TRPCReactProvider>
    </div>
  );
}
