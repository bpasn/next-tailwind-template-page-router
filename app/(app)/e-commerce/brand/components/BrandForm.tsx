'use client';
import {
    Form,
    FormField,
    FormItem,
    FormLabel
} from '@/components/ui/form';
import {
    InputForm,
    UploadImageForm
} from '@/provider/form-provider';
import React from 'react'
import { useForm } from 'react-hook-form';
import {
    BrandInfer,
    BrandResover
} from '../schema/brandSchema';
import { Button } from '@/components/ui/button';

const BrandForm = () => {
    const form = useForm<BrandInfer>({
        resolver: BrandResover,
        defaultValues: {
            name: "",
            logoImage: ""
        }
    });
    return (
        <Form {...form}>
            <form className='space-y-2' onSubmit={form.handleSubmit((d) => { console.log(d)})}>
                <InputForm
                    control={form.control}
                    name="name"
                    formLabel='Brand Name'
                />
                <FormField
                    control={form.control}
                    name="logoImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Brand Logo</FormLabel>
                            <UploadImageForm
                                value={field.value!}
                                onChange={(file) => {
                                    return field.onChange(file);
                                }}
                            />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="ml-auto"  >
                    Save Changed
                </Button>
            </form>
        </Form>
    )
}

export default BrandForm