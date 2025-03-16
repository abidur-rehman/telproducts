import { getCustomerById } from "@/lib/actions/customer.actions";
import CustomerForm from "@/components/shared/customer/edit-customer";

type PageProps = {
    params: Promise<{ customerId: string }>
  }

const Customer = async ({ params }: PageProps) => {
    const { customerId } = await params;
    const customer = await getCustomerById(customerId);

    return (
        <div>
          <CustomerForm customer={customer} mode="edit" />
        </div>
    )
};

export default Customer;