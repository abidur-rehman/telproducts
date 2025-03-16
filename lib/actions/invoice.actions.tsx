'use server';
import { PrismaClient } from '@prisma/client';
import { convertToPlainObject } from '../utils';
import { GET_INVOICES_LIMIT } from '../constants';
import { Invoice } from '@/types';
import { invoiceSchema } from '../validator';
import { formatError } from '../utils';

// Get all invoices
export async function getInvoices(customerId: string) {
  const prisma = new PrismaClient();

  const data = await prisma.invoice.findMany({
    where: {
      customerId: customerId
    },
    take: GET_INVOICES_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  return convertToPlainObject(data);
}

export async function getInvoiceById(invoiceId: string) {
  const prisma = new PrismaClient();

  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
    },
  });

  return convertToPlainObject(data);
}

// Add a new invoice
export async function addInvoice(invoiceData: Invoice) {
  try {
    const prisma = new PrismaClient();
    const invoice = invoiceSchema.parse(invoiceData);
    await prisma.invoice.create({
      data: invoice
    });

    return { success: true, message: 'Invoice added'};
  } catch (error) {
    console.error('Error adding invoice:', error);
    return { success: false, message: formatError(error)};
  }
}

export async function updateInvoice(invoiceData: Invoice, mode: string, invoiceId: string) {
  try {
    const prisma = new PrismaClient();
    const invoice = invoiceSchema.parse(invoiceData);
    let message = 'Invoice added successfully!';

    if (mode === 'edit') {
      console.log('invoice', invoice);
      await prisma.invoice.update({
        where: { 
          id: invoiceId
        },
        data: invoice
      });
      message = 'Invoice updated successfully!';
    } else {
      await prisma.invoice.create({
        data: invoice
      });
    }

    return { success: true, message};
  } catch (error) {
    console.error('Error adding invoice:', error);
    return { success: false, message: formatError(error)};
  }
}

export async function deleteInvoiceById(invoiceId: string) {
  try {
    const prisma = new PrismaClient();

    await prisma.invoice.delete({
      where: { 
        id: invoiceId
      },
    });

    return { success: true, message: 'Invoice deleted successfully!'};
  } catch (error) {
    console.error('Error deleting invoice:', error);
    return { success: false, message: formatError(error)};
  }
}
