'use server';

import { api } from '@/trpc/server';

export async function listServices() {
  const services = await api.service.getAll();

  return {
    services
  };
}

export async function getById(id: string) {
  const service = await api.service.getById({ id });
  return service;
}

export async function createService(data: any) {
  const service = await api.service.create(data);
  return service;
}

export async function updateService(data: any) {
  const service = await api.service.update(data);
  return service;
}
