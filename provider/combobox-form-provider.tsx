'use client';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { FormControl } from '@/components/ui/form';
import { InputProps } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useStoreCombobox } from '@/hook/useStoreCombobox';
import { cn } from '@/lib/utils';
import { ArrowUpDown, CheckIcon } from 'lucide-react';
import React, { forwardRef, useEffect, useState } from 'react'
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

interface ComboboxFormProvider {
    value: string;
    options: ComboboxProps[];
    onChange: (v: string) => void;
    placeholder?: string;
    isLoading?: boolean;
}


const ComboboxFormProvider = React.forwardRef<HTMLButtonElement, ComboboxFormProvider>(({
    value,
    options,
    onChange,
    placeholder,
    isLoading
}: ComboboxFormProvider,ref) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Popover onOpenChange={() => setIsOpen(!isOpen)} open={isOpen}>
            <FormControl>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isOpen}
                        className="w-full justify-between"
                        ref={ref}
                    >
                        {value
                            ? options.find((option: ComboboxProps) => option.value === value)?.label
                            : placeholder || "Select input..."}
                        <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
            </FormControl>
            <PopoverContent className="">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandEmpty>No Input Found.</CommandEmpty>
                    <CommandGroup>
                        {options.map((option: ComboboxProps) => (
                            <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={(v) => {
                                    onChange(option.value === value ? value : option.value);
                                    setIsOpen(!isOpen)
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
})

export default ComboboxFormProvider