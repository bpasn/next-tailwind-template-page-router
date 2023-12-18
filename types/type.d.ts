
interface StoreModel<T> {
    isOpen: boolean;
    data: T | null;
    onClose: () => void;
    onOpen: () => void;
    onEdit: (data: T) => void;
}

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    maxLength: number;

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

interface StoreDataTable<T extends BaseModel> {
    loading: boolean;
    setLoading: (l: boolean) => void;
    dataTable: IDataTable<T>;
    onSelectChange: (v: string) => void;
    setData: (data: T[]) => void;
    setPageIndex: (p: number) => void;
}


interface IDataTable<TData extends BaseModel> {
    count: number;
    data: TData[];
    page: number;
    pageSize: PERPAGE_OPTION;
}


interface BaseResponse {
    status: number;
    success: boolean;
}

interface ResponseData<T> extends BaseResponse {
    payload: T;
}
interface ResponseValidate<T> extends BaseResponse {
    errors: T
}
