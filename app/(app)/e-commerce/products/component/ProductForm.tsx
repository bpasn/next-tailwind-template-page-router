'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductFormInfer, ProductFormSchema } from '../schema/productSchema';
import { InputForm } from '@/provider/form-provider';
const ProductForm = () => {
  const form = useForm<ProductFormInfer>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: "",
      title: "",
      categoryId: "",
      brandId: "",
      price: 0,
      qualtity: 0,
      sku: "",
      description: "",
      images: []
    }
  });

  const handleSubmit = (data: ProductFormInfer) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(handleSubmit)}>
        <InputForm
          control={form.control}
          name='name'
          formLabel='Product Name'
        />
        <InputForm
          control={form.control}
          name='title'
          formLabel='Title'
        />
        <InputForm
          control={form.control}
          name='categoryId'
          formLabel='Category Name'
        />
        <InputForm
          control={form.control}
          name='brandId'
          formLabel='Brands'
        />
        <InputForm
          control={form.control}
          name='price'
          formLabel='Price'
        />
        <InputForm
          control={form.control}
          name="qualtity"
          formLabel='Qualtity'
        />
        <InputForm
          control={form.control}
          name='sku'
          formLabel='SKU'
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} value={""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="ml-auto" type="submit" >
          Save Changed
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;