import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { formatDate } from "@/lib/utils";
import Link from 'next/link';

const InvoiceList = ({
    data,
    customerId,
    name,
    limit,
  }: {
    data: unknown[];
    customerId: string;
    name: string;
    limit?: number;
  }) => {
    const limitedData = limit ? data.slice(0, limit) : data;

  console.log('customerId', customerId);

  if (limitedData.length < 1) {
    return (
      <div>
        <div className="text-center">No Invoices found!</div>
        <Button className="mt-8">
          <Link
          href={{
            pathname: `invoices/add`,
            query: { name: name},
            }}>
            Add Invoice</Link>
        </Button>
       </div>
    );
  }

  return (
    <div>
      <h2 className="text-center underline mb-4">Invoice List for {name}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Number</TableHead>
            <TableHead className="w-[200px]">Invoice Date</TableHead>
            <TableHead className="w-[200px]">Amount</TableHead>
            <TableHead className="w-[80px]">Status</TableHead>
            <TableHead  className="w-[70px]">Due Date</TableHead>
            <TableHead  className="w-[70px]">Paid At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {limitedData.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium underline">
                <Link
                 href={{
                  pathname: `invoices/${invoice.id}`,
                  query: { name: name},
                  }} className='flex-start'>
                  {invoice.number}
                </Link>
              </TableCell>
              <TableCell>{formatDate(invoice.invoiceDate)}</TableCell>
              <TableCell>£{invoice.amount}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>{formatDate(invoice.dueDate)}</TableCell>
              <TableCell>{formatDate(invoice.paidAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className="mt-8">
        <Link
         href={{
          pathname: `invoices/add`,
          query: { name: name},
          }}>
          Add Invoice</Link>
      </Button>
    </div>
  );
}; 

export default InvoiceList;