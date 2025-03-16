
import InvoiceForm from "@/components/shared/invoice/edit-invoice";

type PageProps = {
  params: Promise<{ customerId: string,  name: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const AddInvoice = async ({ params, searchParams }: PageProps) => {
  const { customerId } = await params;

    return (
        <InvoiceForm customerId={customerId} name={searchParams?.name}/>
      );
}
 
export default AddInvoice;


