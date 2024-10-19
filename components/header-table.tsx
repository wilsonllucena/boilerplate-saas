import Link from 'next/link';
import { Breadcrumbs } from './breadcrumbs';
import { Heading } from './ui/heading';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

type HeadingPageListProps = {
  title: string;
  resource: string;
  total: number;
};

export function HeadingPageList({
  title,
  resource,
  total
}: HeadingPageListProps) {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`${title} (${total})`} />
        <Link href={`/dashboard/${resource}/new`}>
          <Button className="text-xs md:text-sm">
            <Plus className="mr-2 h-4 w-4" /> Novo {title.toLowerCase()}
          </Button>
        </Link>
      </div>
    </>
  );
}
