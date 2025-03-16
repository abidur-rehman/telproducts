import InvoiceList from "@/components/shared/invoice/invoice-list";
import { getInvoices } from "@/lib/actions/invoice.actions";


type PageProps = {
  params: Promise<{ customerId: string }>,
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const CustomerInvoices = async ({ params, searchParams }: PageProps) => {
  const { customerId } = await params;
  const invoices = await getInvoices(customerId);

  return <InvoiceList data={invoices} customerId={customerId} name={searchParams?.name} limit={4}/>;
};

export default CustomerInvoices;
