export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Tel Products';
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Modern ecommerce website';
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 10;
export const GET_CUSTOMERS_LIMIT =
  Number(process.env.GET_CUSTOMERS_LIMIT) || 10;  
export const GET_INVOICES_LIMIT =
  Number(process.env.GET_INVOICES_LIMIT) || 10;
  
  
export const invoiceDefault = {
  customerId: '',
  invoiceDate: new Date(),
  amount: 0,
  status: 'PENDING',
  dueDate: new Date(),
  paidAt: new Date(),
  comments: ''
};
  