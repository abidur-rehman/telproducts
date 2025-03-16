import { z } from 'zod';
import { customerSchema, invoiceSchema } from '@/lib/validator';

export type Invoice = z.infer<typeof invoiceSchema> & {
    id: string;
    createdAt: Date;
};

export type Customer = z.infer<typeof customerSchema> & {
  id: string;
  createdAt: Date;
};