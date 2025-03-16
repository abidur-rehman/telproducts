import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';

// Schema for inserting a product

const VALUES = ["PENDING", "PAID", "CANCELLED"] as const;
const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Amount must have exactly two decimal places (e.g., 49.99)'
  );

export const invoiceSchema = z.object({
  customerId: z.string(),
  number: z.string().min(3, 'Invoice number must be at least 3 character'),
  invoiceDate: z.coerce.date(),
  amount: currency,
  status: z.enum(VALUES),
  dueDate: z.coerce.date(),
  paidAt: z.coerce.date(),
  comments: z.string()
});


const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const customerSchema = z.object({
  number: z.string().min(3, 'Number must be at least 3 character'),
  name: z.string().min(3, 'Name must be at least 3 character'),
  email: z.string()
  .min(1, { message: "This field has to be filled." })
  .email("This is not a valid email."),
  street1: z.string().min(3, 'Street1 must be at least 3 character'),
  street2: z.string().min(3, 'Street2 must be at least 3 character'),
  postcode: z.string().min(3, 'PostCode must be at least 3 character'),
  city: z.string().min(3, 'City must be at least 3 character'),
  phone: z.string().regex(phoneRegex, 'Invalid phone number!'),
});

export const insertProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  category: z.string().min(3, 'Category must be at least 3 characters'),
  brand: z.string().min(3, 'Brand must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'Product must have at least one image'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
});