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

interface InputImageFormProps<T extends FieldValues> extends CommonFormProps<HTMLInputElement, T> {
    multiple?: boolean;
}
export const InputImageForm = <T extends FieldValues>(
    {
        multiple = false,
        ...props
    }: InputImageFormProps<T>
) => {
    const onChooseImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        const files = e.target.files || [];
        const newFiles: { image: File }[] = [];
        const keys = Object.keys(files);
        for (let i = 0; i < keys.length; i++) {
            const file = files[i];
            newFiles.push({ image: file });
        }

        return newFiles;
    }
    return (
        <FormField
            control={props.control}
            name={props.name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel htmlFor={field.name}>{props.formLabel}</FormLabel>
                    <FormControl>
                        <div>
                            <div className="mb-4 flex flex-row items-cnter gap-4">
                                {Array.isArray(field.value) ? field.value.map((image: any) => {
                                    console.log({image})
                                    return (
                                        <div className="relative block-image w-[200px] h-[200px] rounded-md overflow-hidden">
                                            <p>this will be an image render</p>
                                            <div className="z-10 absolute top-2 right-2">
                                                <Button
                                                    type="button"
                                                    variant={"destructive"}
                                                    size={"icon"}
                                                >
                                                    <Trash />
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                }) : <></>}
                            </div>
                            <div className="mb-4 flex flex-row items-center gap-4 w-64">
                                <Input
                                    {...field}
                                    className={cn(
                                        props.className,
                                        "w-full border brder-gray-200 shadow-sm rounded-md text-sm focus:z-10 "
                                    )}
                                    type={"file"}
                                    multiple={multiple}
                                    onChange={(e) => {
                                        const files = onChooseImage(e);
                                        files.map(e => {
                                            field.value = [...field.value, e] as PathValue<T, Path<T>>;
                                        })
                                        field.onChange(files)
                                        // return field.onChange(files);
                                    }}
                                />
                            </div>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
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