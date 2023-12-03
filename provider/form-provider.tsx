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
    FieldValues
} from "react-hook-form";
export declare type UseControllerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    name: TName,
    control?: Control<TFieldValues>,

};
interface InputProps<T extends FieldValues> extends UseControllerProps<T> {
    formLabel: string;
    disabled?: boolean;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
export const InputForm = <T extends FieldValues>(
    {
        formLabel,
        control,
        disabled,
        placeholder,
        name,
        onChange
    }: InputProps<T>
) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{formLabel}</FormLabel>
                    <FormControl>
                        <Input {...field} onChange={(e) => field.onChange(e)} disabled={disabled} placeholder={placeholder} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};