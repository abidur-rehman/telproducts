'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Invoice } from '@/types';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { invoiceSchema } from '@/lib/validator';
import { ControllerRenderProps } from 'react-hook-form';
import { toast } from 'sonner';
import { useTransition, useEffect } from 'react';
import { updateInvoice, deleteInvoiceById } from '@/lib/actions/invoice.actions';

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
  import { cn } from "@/lib/utils";
  import { format } from "date-fns";
  import { CalendarIcon } from "lucide-react";
  import { Calendar } from "@/components/ui/calendar";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";

  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import { invoiceDefault } from '@/lib/constants';
  import { Textarea } from "@/components/ui/textarea";

interface InvoiceFormProps {
  invoice?: Invoice;
  mode?: 'create' | 'edit';
  customerId: string;
  name: string;
}

  const InvoiceForm = ({ customerId, name, invoice, mode = 'create' } : InvoiceFormProps) => {
    const router = useRouter();
    let defaultVal = invoiceDefault;
    if (mode === 'edit' && invoice) {
      defaultVal = invoice;
    }
    const form = useForm<z.infer<typeof invoiceSchema>>({
      resolver: zodResolver(invoiceSchema),
      defaultValues: defaultVal,
    });
    const [isPending, startTransition] = useTransition();

    const onSubmit: SubmitHandler<Invoice> = (data) => {
      data.customerId = customerId;
      console.log('data', data);
      startTransition(async () => {
        // const response = await addInvoice(data);  
        const response = await updateInvoice(data, mode, invoice?.id);  
        if (response.success) {
          toast.success(response.message);
          router.push(`/customers/${customerId}/invoices`);
        } else {
          toast.error(response.message);
        }
      });
    };

    const onDelete = () => {
      console.log('invoice', invoice?.id);
      startTransition(async () => {
        const response = await deleteInvoiceById(invoice?.id);  
        if (response.success) {
          toast.success(response.message);
          router.push(`/customers/${customerId}/invoices`);
        } else {
          toast.error(response.message);
        }
      });
    }

    useEffect(() => {
      if (invoice) {
        Object.entries(invoice).forEach(([key, value]) => {
          form.setValue(key as keyof typeof invoice, value);
        });
      }
    }, [invoice, form]);

    return (
        <div className='max-w-md mx-auto space-y-4'>
        <h1 className='h2-bold mt-4'>
          {mode === 'edit' ? 'Edit Invoice' : 'New Invoice'}
        </h1>
        <p className='text-sm text-muted-foreground'>
          Please enter the invoice details for {name}
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
                name='customerId'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<"customerId">;
                }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Customer Id</FormLabel>
                    <FormControl>
                      <Input {...field} value={customerId} disabled={true} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex flex-col gap-5 md:flex-row'>
              <FormField
                control={form.control}
                name='number'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof invoiceSchema>,"number"
                  >;
                }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Number</FormLabel>
                    <FormControl>
                      <Input placeholder='TS...' {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name='invoiceDate'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof invoiceSchema>, 'invoiceDate'
                  >;
                }) => (
                  <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name='amount'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof invoiceSchema>, 'amount'
                  >;
                }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder='Amount' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name='status'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof invoiceSchema>, 'status'
                  >;
                }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={field.value}/>
                        </SelectTrigger>
                      </FormControl>  
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="PENDING">PENDING</SelectItem>
                          <SelectItem value="PAID">PAID</SelectItem>
                          <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                      <FormMessage />
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name='dueDate'
                render={({ field, }: {
                  field: ControllerRenderProps<
                    z.infer<typeof invoiceSchema>, 'dueDate'
                  >;
                }) => (
                  <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
                )}
              />
            </div>
            <div>
            <FormField
              control={form.control}
              name='paidAt'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof invoiceSchema>, 'paidAt'
                >;
              }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Pait at </FormLabel>
                  <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='comments'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof invoiceSchema>,"comments"
                >;
              }) => (
                <FormItem className='w-full'>
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Comments"
                      className="resize-none"
                      {...field}
                    />
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
        {mode === 'edit' ? <> 
            <Form {...form}>
              <form
                method='post'
                onSubmit={form.handleSubmit(onDelete)}
                className='space-y-4'
              >
                <div className='flex gap-2'>
                  <Button type='submit' disabled={isPending} className=' bg-red-700'>
                    {isPending ? (
                      <Loader className='animate-spin w-4 h-4' />
                    ) : (
                      <ArrowRight className='w-4 h-4' />
                    )}
                    Delete
                  </Button>
                </div>
              </form>  
            </Form>
          </> 
        : ''}  
      </div>
      );
  }
   
  export default InvoiceForm;