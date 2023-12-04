'use client';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Control,
    FieldPath,
    FieldValues
} from "react-hook-form";
import { useStoreCombobox } from "@/hook/useStoreCombobox";
import React, { HTMLAttributes, HtmlHTMLAttributes, useEffect, useState } from "react";
import ComboboxFormProvider from "./combobox-form-provider";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
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
    const [isOpen, setIsOpen] = useState(false);
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem>
                        <FormLabel>{formLabel}</FormLabel>
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger value={field.value} defaultValue={field.value} placeholder={placeholder}>
                                    <SelectValue
                                        defaultValue={field.value}
                                        placeholder={placeholder}
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <div className="mb-2">
                                    <Input placeholder={placeholder} onChange={(e) => {
                                        field.onChange(e);
                                    }} />
                                </div>
                                {(disabled) ? (
                                    <div className="p-2">No Result</div>
                                ) : options.map((command: ComboboxProps) => {
                                    return (
                                        <SelectItem
                                            key={command.value}
                                            value={command.value}
                                            className="cursor-pointer"
                                        >
                                            {command.label}
                                        </SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                    </FormItem>
                )
            }}
        />
    )
}