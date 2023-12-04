'use client';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { FormControl } from '@/components/ui/form';
import { InputProps } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useStoreCombobox } from '@/hook/useStoreCombobox';
import { cn } from '@/lib/utils';
import { ArrowUpDown, CheckIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

interface ComboboxFormProvider<T extends FieldValues> {
    renderInput?: () => InputProps & React.RefAttributes<HTMLInputElement>;
    field: ControllerRenderProps<T, Path<T>>;
    open: boolean;
    toggle: () => void;
    value: string;
    options: ComboboxProps[];
}

const ComboboxFormProvider = <T extends FieldValues>({
    field,
    open,
    toggle,
    value,
    options
}: ComboboxFormProvider<T>) => {
    const [isMounted, setIsMounted] = useState(false);
    const storeCombobox = useStoreCombobox();
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Popover onOpenChange={toggle} open={open}>
            <FormControl>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value
                            ? options.find((option: ComboboxProps) => option.value === value)?.label
                            : "Select framework..."}
                        <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
            </FormControl>
            <PopoverContent className="">
                <Command>
                    <CommandInput onValueChange={(s) => {
                        field.onChange(s);
                    }} name={field.name} />
                    <CommandEmpty>No Input Found.</CommandEmpty>
                    <CommandGroup>
                        {options.map((option: ComboboxProps) => (
                            <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={(e) => {
                                    storeCombobox.setValue(e);
                                    storeCombobox.onToggle();
                                }}
                            >
                                {option.value}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        "value" === option.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default ComboboxFormProvider