import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import CustomerAddress from "./customer-address";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types";

const CustomerList = ({
    data,
    limit,
  }: {
    data: Customer[];
    limit?: number;
  }) => {
    const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <div>
      <h2 className="text-center underline mb-4">Customers List</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Number</TableHead>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[80px]">Email</TableHead>
            <TableHead  className="w-[70px]">Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Invoices</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {limitedData.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.number}</TableCell>
              <TableCell className="font-medium underline">
                <Link href={`customers/${customer.id}`} className='flex-start'>
                  {customer.name}
                </Link>
              </TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell><CustomerAddress customer={customer}/></TableCell>
              <TableCell>
                <Link
                href={{
                  pathname: `customers/${customer.id}/invoices`,
                  query: { name: customer.name},
                  }}
                className='flex-start underline'>
                Invoices
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className="mt-8">
        <Link href="customers/add">Add Customer</Link>
      </Button>
    </div>  
  );
}; 

export default CustomerList;