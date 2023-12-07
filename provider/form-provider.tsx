'use client';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Control,
    FieldPath,
    FieldValues,
    Path,
    PathValue
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from 'next/image';
import ComboboxFormProvider from "./combobox-form-provider";
import { ImagesSchema, ProductFormInfer, ProductFormSchema } from "@/app/(app)/e-commerce/products/schema/productSchema";
import zod from 'zod';
export declare interface UseControllerProps<
    TElement extends HTMLElement,
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends React.HTMLAttributes<TElement> {
    name: TName,
    control?: Control<TFieldValues>,
};
interface CommonFormProps<H extends HTMLElement, T extends FieldValues> extends UseControllerProps<H, T> {
    formLabel: string;
    disabled?: boolean;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<H>;
    type?: React.HTMLInputTypeAttribute | undefined
}

export const InputForm = <T extends FieldValues>(
    {
        formLabel,
        control,
        disabled,
        placeholder,
        name,
        onChange,
        type,
        className,
    }: CommonFormProps<HTMLInputElement, T>
) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel htmlFor={field.name}>{formLabel}</FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            className={cn(className)}
                            type={type}
                            onChange={(e) => field.onChange(e)}
                            disabled={disabled}
                            placeholder={placeholder}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
export const TextareaForm = <T extends FieldValues>(
    {
        formLabel,
        control,
        disabled,
        placeholder,
        name,
        onChange
    }: CommonFormProps<HTMLTextAreaElement, T>
) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel htmlFor={field.name}>{formLabel}</FormLabel>
                    <FormControl>
                        <Textarea {...field} onChange={(e) => field.onChange(e)} disabled={disabled} placeholder={placeholder} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

type ImageInfer = zod.infer<typeof ImagesSchema>;
interface InputImageFormProps {
    multiple?: boolean;
    value: File[];
    onChange: (val: File) => void;
}
export const UploadImageForm = (
    {
        multiple = false,
        value,
        onChange
    }: InputImageFormProps
) => {
    const onChooseImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files || [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            onChange(file);
        }
    }
    return (
        <div className="overflow-hidden w-[500px]">
            <div className="mb-4 flex flex-wrap items-cnter gap-4" >
                {Array.isArray(value) ? value.map((file: File, index: number) => {
                    console.log({ file })
                    return (
                        <div key={file.name} className=" w-[200px] h-[200px] rounded-md ">
                            <img
                            width={500}
                            height={500}
                            className="w-full h-full object-cover"
                                src={URL.createObjectURL(file)}
                                alt="Image"
                            />
                            <div className="z-10 absolute top-2 right-2">
                                {/* <Button
                                    type="button"
                                    onClick={() => {

                                    }}
                                    variant={"destructive"}
                                    size={"icon"}>
                                    <Trash />
                                </Button> */}
                            </div>
                        </div>
                    );
                }) : value && (
                    <>s</>
                )}
            </div>
            <div className="mb-4 flex flex-row items-center gap-4 w-64">
                <Input
                    className={cn(
                        "max-w-sm",
                        "w-full border brder-gray-200 shadow-sm rounded-md text-sm focus:z-10 "
                    )}
                    type={"file"}
                    multiple={multiple}
                    onChange={onChooseImage}
                />
            </div>
        </div>
    );
}


interface ComboboxFormProps<T extends FieldValues> extends CommonFormProps<HTMLElement, T> {
    options: ComboboxProps[];
}

export const ComboboxForm = <T extends FieldValues>(
    {
        control,
        name,
        formLabel,
        options,
        placeholder,
        disabled
    }: ComboboxFormProps<T>
) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem>
                        <FormLabel>{formLabel}</FormLabel>
                        <FormControl>
                            <ComboboxFormProvider
                                {...field}
                                value={field.value}
                                options={options}
                                placeholder={placeholder}
                                isLoading={disabled}
                            />
                        </FormControl>
                    </FormItem>
                )
            }}
        />
    )
}