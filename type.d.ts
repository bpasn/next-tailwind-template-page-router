interface StoreModel<T> {
    isOpen: boolean;
    data: T | null;
    onClose: () => void;
    onOpen: () => void;
    onEdit: (data: T) => void;
}

interface UseStoreComboboxProps {
    data: ComboboxProps[];
    isOpen: boolean;
    value: string;
    loading: boolean;
    initialValue?: (v: string) => void;
    onToggle: () => void;
    onSelect: (cv: string) => void;
    setData: (d: ComboboxProps[]) => void;
    filter: (v: string) => void;
    setValue: (v: string) => void;
}

interface ComboboxProps {
    label: string
    value: string;
}