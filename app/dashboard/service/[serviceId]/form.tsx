'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { ServiceRequest, serviceSchema } from '@/schemas/service.schema';
import { useToast } from '@/components/ui/use-toast';
import { api, queryClient } from '@/trpc/react';
import { GET_SERVICES } from '@/app/constants';
import { formatCurrency } from '@/utils/currency';
import { AlertModal } from '@/components/modal/alert-modal';

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface FormProps {
  initialData: any | null;
}

export const ServiceForm: React.FC<FormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Atualizar serviço' : 'Cadastrar serviço';
  const description = initialData
    ? 'Editar serviço.'
    : 'Adicionar novo serviço';
  const action = initialData ? 'Atualizar' : 'Salvar';

  const defaultValues = initialData;

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      id: defaultValues?.id || '',
      name: defaultValues?.name || '',
      description: defaultValues?.description || '',
      price: defaultValues?.price || ''
    }
  });
  const { mutate: create } = api.service.create.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_SERVICES]
      });
      toast({
        title: 'Serviço salvo',
        description: 'Serviço salvo com sucesso'
      });
      router.push(`/dashboard/service`);
    }
  });

  const { mutate: update } = api.service.update.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_SERVICES]
      });
      toast({
        title: 'Serviço atualizado',
        description: 'Serviço atualizado com sucesso'
      });
      router.push(`/dashboard/service`);
    }
  });

  const onSubmit = async (data: ServiceRequest) => {
    try {
      setLoading(true);

      if (initialData) {
        update({
          ...data,
          id: initialData.id
        });
      } else {
        create({ ...data });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.serviceId}`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Descrição"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="R$ 0,00"
                      {...field}
                      disabled={loading}
                      value={formatCurrency(field.value)}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, '');
                        field.onChange(rawValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
