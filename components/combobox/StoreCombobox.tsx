'use client';

import React, { useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import {
    CommandInput,
    CommandEmpty,
    CommandGroup
} from '@/components/ui/command';
import { ArrowUpDown, CheckIcon, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CommandItem } from '../ui/command';
import { useStoreCombobox } from '@/hook/useStoreCombobox';

interface StoreComboboxProps {

}

const StoreCombobox = ({

}: StoreComboboxProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const storeCombobox = useStoreCombobox();
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) return null;

    return (
        <Popover open={storeCombobox.isOpen} onOpenChange={storeCombobox.onToggle}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    role='combobox'
                    aria-expanded={storeCombobox.isOpen}
                    className='w-[200px] justify-between'
                >
                    {storeCombobox.data.find((combobox: ComboboxProps) => combobox.value === "") ? '' : 'Select Input'}
                    <ArrowUpDown className={
                        cn("ml-2 h-4 w-4 shrink-0 opacity-50")
                    } />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn(
                "w-[200px] p-0"
            )}>
                <Command>
                    <CommandInput placeholder='"Search Input' className='h-9' />
                    <CommandEmpty>No Input found.</CommandEmpty>
                    <CommandGroup>
                        {storeCombobox.data.map((combobox: ComboboxProps) => (
                            <CommandItem
                                key={combobox.value}
                                value={combobox.value}
                                onSelect={(cv) => {

                                }}
                            >
                                {combobox.label}
                                <CheckIcon
                                    className={
                                        cn(
                                            "ml-auto h-4 w-4",
                                            storeCombobox.value === combobox.value ? 'opacity-200' : 'opacity-0'
                                        )

                                    }
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default StoreCombobox