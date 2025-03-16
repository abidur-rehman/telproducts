import { Customer } from "@/types";

const CustomerAddress = ({ customer }: { customer: Customer })  => {
  return (
    <>{customer.street1} {customer.street2} {customer.postcode} {customer.city}</>
  );
}; 

export default CustomerAddress;