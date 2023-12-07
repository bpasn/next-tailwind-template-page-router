'use client';
import { Button } from '@/components/ui/button';
import {
  Form, FormField,
} from '@/components/ui/form';
import React from 'react';
import {
  useFieldArray,
  useForm
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ProductFormInfer,
  ProductFormSchema
} from '../schema/productSchema';
import {
  ComboboxForm,
  InputForm,
  TextareaForm,
  UploadImageForm
} from '@/provider/form-provider';
import { X } from 'lucide-react';
export const optionTest: ComboboxProps[] = [{
  value: "next.js",
  label: "Next.js",
},
{
  value: "sveltekit",
  label: "SvelteKit",
},
{
  value: "nuxt.js",
  label: "Nuxt.js",
},
{
  value: "remix",
  label: "Remix",
},
{
  value: "astro",
  label: "Astro",
}]
const ProductForm = ({
  initialState
}: {
  initialState?: ProductModel
}) => {
  const form = useForm<ProductFormInfer>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: initialState || {
      name: "",
      title: "",
      categoryId: "",
      brandId: "",
      price: 0,
      qualtity: 0,
      sku: "",
      description: "",
      additionals: [],
      images: []
    }
  });
  const {
    fields: addtionals,
    append: appdenAddtional,
    remove: removeAddtional
  } = useFieldArray({
    control: form.control,
    name: "additionals"
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
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-3">
          <ComboboxForm
            control={form.control}
            name='categoryId'
            formLabel='Category'
            placeholder='Select Category'
            options={optionTest}
          />
          <ComboboxForm
            control={form.control}
            name='brandId'
            formLabel='Brands'
            placeholder='Select Brand'
            options={optionTest}
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
        </div>
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => {
            return (
              <UploadImageForm
                multiple={true}
                value={field.value?.map(file => (file.image as File))!}
                onChange={(e: File) => {
                  let newFile: { image: File } = { image: e };
                  if (field.value?.find(file => file === newFile)) {
                    return field.onChange(field.value);
                  }
                  field.value = [...field.value!, newFile];
                  return field.onChange(field.value)
                }}
              />
            );
          }}
        />
        <TextareaForm
          control={form.control}
          name='description'
          formLabel='Product Description'
        />
        <div className='flex flex-col gap-3'>
          <ul className="list-decimal flex flex-col gap-5">
            {addtionals.map((field, index) => (
              <li key={field.id} className='w-full'>
                <div className="flex">
                  Additional ({index + 1})
                  <X
                    className="ml-auto text-destructive transform w-[1.8rem] h-[1.8rem] transition duration-500 hover:scale-125 cursor-pointer"
                    onClick={() => removeAddtional(index)}
                  />
                </div>
                <ul className='w-full grid grid-cols-1 md:grid-cols-3 gap-2'>
                  <InputForm
                    control={form.control}
                    name={`additionals.${index}.title`}
                    formLabel={"Title"}
                  />
                  <div className="md:col-span-3">
                    <TextareaForm
                      control={form.control}
                      name={`additionals.${index}.detail`}
                      formLabel={"Detail"}
                    />
                  </div>
                </ul>
              </li>
            ))}
          </ul>
          <Button className='max-w-[150px] w-full' type="button" onClick={() => appdenAddtional({
            title: "",
            detail: ""
          })}>Add additional</Button>
        </div>
        <Button type="submit" className="ml-auto"  >
          Save Changed
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;