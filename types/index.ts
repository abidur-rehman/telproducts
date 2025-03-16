import { z } from 'zod';
import { customerSchema, invoiceSchema, insertProductSchema } from '@/lib/validator';

export type Invoice = z.infer<typeof invoiceSchema> & {
    id: string;
    createdAt: Date;
};

export type Customer = z.infer<typeof customerSchema> & {
  id: string;
  createdAt: Date;
};

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: Date;
  rating: string;
  numReviews: number;
};