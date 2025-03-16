'use server';
import { PrismaClient } from '@prisma/client';
import { convertToPlainObject } from '../utils';
import { GET_CUSTOMERS_LIMIT } from '../constants';
import { customerSchema } from '../validator';
import { Customer } from '@/types';
import { formatError } from '../utils';

// Get all customers
export async function getCustomers() {
  const prisma = new PrismaClient();

  const data = await prisma.customer.findMany({
    take: GET_CUSTOMERS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  return convertToPlainObject(data);
}


// Get customer by id
export async function getCustomerById(customerId: string) {
  const prisma = new PrismaClient();

  const data = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  return convertToPlainObject(data);
}


// Add new customer
export async function updateCustomer(customerData: Customer, mode: string, customerId: string) {
  try {
    const prisma = new PrismaClient();
    const customer = customerSchema.parse(customerData);
    let message = 'Customer added successfully!';

    if (mode === 'edit') {
      await prisma.customer.update({
        where: { 
          id: customerId
        },
        data: customer
      });
      message = 'Customer updated successfully!';
    } else {
      await prisma.customer.create({
        data: customer
      });
    }

    return { success: true, message};
  } catch (error) {
    console.error('Error adding customer:', error);
    return { success: false, message: formatError(error)};
  }
}