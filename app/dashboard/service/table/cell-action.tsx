'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';

// import { Modal } from "../../_components/modal";
// import { AlertModal } from "@/components/alert-modal";
import { api, queryClient } from '@/trpc/react';
import { useToast } from '@/components/ui/use-toast';
import { GET_SERVICES } from '@/app/constants';
import { AlertModal } from '@/components/modal/alert-modal';
import { useRouter } from 'next/navigation';

interface CellActionProps {
  data: any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

  const { mutate: deleteService } = api.service.delete.useMutation({
    onSuccess: () => {
      setLoading(false);
      setOpenDelete(false);
      queryClient.invalidateQueries({
        queryKey: [GET_SERVICES]
      });
      toast({
        title: 'Serviço removido',
        description: 'Serviço removido com sucesso'
      });
    }
  });

  function handleDelete() {
    try {
      setLoading(true);
      deleteService(data);
    } catch (error) {
      toast({
        title: 'Erro ao remover serviço',
        description: 'Erro ao remover serviço'
      });
    }
  }

  return (
    <>
      <AlertModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        loading={loading}
      />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/service/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
