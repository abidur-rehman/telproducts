import CustomerList from "@/components/shared/customer/customer-list";
import { getCustomers } from "@/lib/actions/customer.actions";

const Customers = async() => {
    const customers = await getCustomers();
    return (
      <div className='space-y-8'>
        <CustomerList data={customers} limit={4}/>
      </div>
    );
  };

  export default Customers;

