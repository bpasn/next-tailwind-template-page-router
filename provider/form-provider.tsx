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
    Control,
    FieldPath,
    FieldValues,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import ComboboxFormProvider from "./combobox-form-provider";
import { ImagesSchema } from "@/app/(app)/e-commerce/products/schema/productSchema";
import zod from 'zod';
import _ from "lodash";
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

interface InputImageFormProps {
    multiple?: boolean;
    value: File[] | string | File;
    onChange: (val: File) => void;
}
export const UploadImageForm = (
    {
        multiple = false,
        value,
        onChange,
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
        <div className="space-y-2">
            <div className="mb-4 flex flex-row flex-wrap items-center gap-4" style={{
                flexWrap: "wrap",
                overflow: "auto",
            }}>
                {Array.isArray(value) ? value.map((file: File) => (
                    <div key={file.name} className="relative rounded-md" style={{
                        height: "150px",
                        width: "150px",
                        position: "relative",
                    }}>
                        <Image
                            fill
                            className="!fixed object-cover"
                            src={URL.createObjectURL(file)}
                            alt="Image"
                        />
                        <div className="z-10" style={{
                            position: "absolute",
                            top: "2px !important",
                            right: "2px !important"
                        }}>
                            <Button
                                className="w-10 h-10"
                                type="button"
                                onClick={() => {
                                }}
                                variant={"destructive"}
                                size={"icon"}>
                                <Trash />
                            </Button>
                        </div>
                    </div>
                )) : !_.isEmpty(value) && typeof value === "string" ? (
                    <div className="relative rounded-md" style={{
                        height: "150px",
                        width: "150px",
                        position: "relative",
                    }}>
                        <Image
                            fill
                            className="!fixed object-cover"
                            src={value}
                            alt="Image"
                        />
                        <div className="z-10" style={{
                            position: "absolute",
                            top: "2px !important",
                            right: "2px !important"
                        }}>
                            <Button
                                className="w-10 h-10"
                                type="button"
                                onClick={() => {
                                }}
                                variant={"destructive"}
                                size={"icon"}>
                                <Trash />
                            </Button>
                        </div>
                    </div>
                ) : value && typeof value === "object" ? (
                    <div className="relative rounded-md" style={{
                        height: "150px",
                        width: "150px",
                        position: "relative",
                    }}>
                        <Image
                            fill
                            className="!fixed object-cover"
                            src={URL.createObjectURL(value)}
                            alt="Image"
                        />
                        <div className="z-10" style={{
                            position: "absolute",
                            top: "2px",
                            right: "2px",
                            width:"1.5rem",
                            height:"1.5rem"
                        }}>
                            <Button
                                type="button"
                                onClick={() => {
                                }}
                                variant={"destructive"}
                                size={"icon"}>
                                <Trash />
                            </Button>
                        </div>
                    </div>
                ) : null
                }
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