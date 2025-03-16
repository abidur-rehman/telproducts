import { PrismaClient } from '@prisma/client';
import sampleData from './sample-data';
import sampleCustomers from './sample-customers';

async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.invoice.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });

  console.log('Created products successfully');

  // await prisma.customer.createMany({ data: sampleCustomers.customers });
    // Create customers
  const customer1 = await prisma.customer.create({
    data: sampleCustomers.customers[0],
  });

  const customer2 = await prisma.customer.create({
    data: sampleCustomers.customers[1]
  });

  console.log('Created customers successfully');

  // Create invoices for customer1
  const invoice1 = await prisma.invoice.create({
    data: {
      customerId: customer1.id,
      number: 'TS001',
      invoiceDate: new Date(), // Add this
      amount: 299.99,
      status: 'PENDING',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      comments: 'This is a comment',  
    },
  });

  const invoice2 = await prisma.invoice.create({
    data: {
      customerId: customer1.id,
      number: 'TS002',
      invoiceDate: new Date(), // Add this
      amount: 599.99,
      status: 'PAID',
      dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      paidAt: new Date(),
      comments: 'This is a comment',  
    },
  });

  // Create invoice for customer2
  const invoice3 = await prisma.invoice.create({
    data: {
      customerId: customer2.id,
      number: 'TS003',
      invoiceDate: new Date(), // Add this
      amount: 799.99,
      status: 'PENDING',
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      comments: 'This is a comment',  
    },
  });  
  
  console.log('Created invoices successfully');

  console.log('Database seeded successfully');
}

main();