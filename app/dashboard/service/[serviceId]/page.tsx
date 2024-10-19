'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useEffect, useState } from 'react';
import { ServiceForm } from './form';
import { useParams } from 'next/navigation';
import { api } from '@/trpc/react';
import { getById } from '../actions';
import { Service } from '@prisma/client';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Serviço', link: '/dashboard/service' },
  { title: 'Cadastrar', link: '/dashboard/service/new' }
];
export default function Page() {
  const [initialData, setInitialData] = useState<Service>();
  const params = useParams();
  useEffect(() => {
    if (params.serviceId !== 'new') {
      getById(params.serviceId.toString()).then((res: any) =>
        setInitialData(res)
      );
    }
  }, [params.serviceId]);

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <ServiceForm initialData={initialData} key={initialData?.id} />
      </div>
    </PageContainer>
  );
}
