/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { ServiceTable } from './table/data-table';
import { listServices } from './actions';
import { HeadingPageList } from '@/components/header-table';
import { GET_SERVICES } from '@/app/constants';
import { useQuery } from '@tanstack/react-query';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Service', link: '/dashboard/service' }
];
export default function page() {
  const { data: result } = useQuery({
    queryKey: [GET_SERVICES],
    queryFn: () => listServices()
  });
  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <HeadingPageList
          title="Serviços"
          resource="service"
          total={result?.services.length || 0}
        />
        <ServiceTable data={result?.services} />
      </div>
    </PageContainer>
  );
}
