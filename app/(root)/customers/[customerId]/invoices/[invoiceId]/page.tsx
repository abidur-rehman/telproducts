
import InvoiceForm from "@/components/shared/invoice/edit-invoice";
import { getInvoiceById } from "@/lib/actions/invoice.actions";

type PageProps = {
  params: Promise<{ invoiceId: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const EditInvoice = async ({ params, searchParams }: PageProps) => {
  const { invoiceId } = await params;

  const invoice = await getInvoiceById(invoiceId);
  const customerId = invoice?.customerId || '';
  

  return (
      <InvoiceForm customerId={customerId} name={searchParams?.name} mode='edit' invoice={invoice}/>
    );
}
 
export default EditInvoice;


