'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Customer } from '@/types';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema } from '@/lib/validator';
import { ControllerRenderProps } from 'react-hook-form';
import { toast } from 'sonner';
import { useTransition, useEffect } from 'react';
import { updateCustomer } from '@/lib/actions/customer.actions';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
  } from '@/components/ui/form';
  import { Input } from '@/components/ui/input';
  import { Button } from '@/components/ui/button';
  import { ArrowRight, Loader } from 'lucide-react';

  // eslint-disable-next-line
  interface CustomerFormProps {
    customer?: Customer;
    mode?: 'create' | 'edit';
  }

  const CustomerForm = ({ customer, mode = 'create' }: CustomerFormProp) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof customerSchema>>({
      resolver: zodResolver(customerSchema),
      defaultValues: {},
    });
    const [isPending, startTransition] = useTransition();

    const onSubmit: SubmitHandler<Customer> = (data) => {
      startTransition(async () => {
        const response = await updateCustomer(data, mode, customer?.id);  
        if (response.success) {
          toast.success(response.message);
          router.push(`/customers`);
        } else {
          toast.error(response.message);
        }
      });
    };

    useEffect(() => {
      if (customer) {
        Object.entries(customer).forEach(([key, value]) => {
          form.setValue(key as keyof typeof customer, value);
        });
      }
    }, [customer, form]);

    return (
        <div className='max-w-md mx-auto space-y-4'>
        <h1 className='h2-bold mt-4'>
          {mode === 'edit' ? 'Edit Customer' : 'New Customer'}
        </h1>
        <p className='text-sm text-muted-foreground'>
          Please enter the customer details
        </p>
        <Form {...form}>
          <form
            method='post'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <div className='flex flex-col gap-5 md:flex-row'>
              <FormField
                control={form.control}
                name='number'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<"number">;
                }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Number</FormLabel>
                    <FormControl>
                      <Input placeholder='Number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex flex-col gap-5 md:flex-row'>
              <FormField
                control={form.control}
                name='name'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<"name">;
                }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex flex-col gap-5 md:flex-row'>
              <FormField
                control={form.control}
                name='email'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<"email">;
                }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='abd@gmail.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex flex-col gap-5 md:flex-row'>
              <FormField
                control={form.control}
                name='street1'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<"street1">;
                }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Street 1</FormLabel>
                    <FormControl>
                      <Input placeholder='Street 1' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> 
            <div className='flex flex-col gap-5 md:flex-row'>
              <FormField
                control={form.control}
                name='street2'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<"street2">;
                }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Street 2</FormLabel>
                    <FormControl>
                      <Input placeholder='Street 2' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>     
            <div className='flex flex-col gap-5 md:flex-row'>
              <FormField
                control={form.control}
                name='postcode'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<"postcode">;
                }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Post Code</FormLabel>
                    <FormControl>
                      <Input placeholder='Post Code' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>       
            <div className='flex flex-col gap-5 md:flex-row'>
              <FormField
                control={form.control}
                name='city'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<"city">;
                }) => (
                  <FormItem className='w-full'>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder='City' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>  
            <div className='flex flex-col gap-5 md:flex-row'>
              <FormField
                control={form.control}
                name='phone'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<"phone">;
                }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder='Phone' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> 
            <div className='flex gap-2'>
              <Button type='submit' disabled={isPending}>
                {isPending ? (
                  <Loader className='animate-spin w-4 h-4' />
                ) : (
                  <ArrowRight className='w-4 h-4' />
                )}
                {mode === 'edit' ? 'Update' : 'Continue'}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      );
  }
   
  export default CustomerForm;